import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  //inject AuthService to use its methods
  const authService = inject(AuthService)
  //get getaccesstoken from authservice
  const accesstoken =authService.getaccesstoken()
  //get getexpiresat from authservice
  const expiresat =authService.getexpiresat()
  //if you have accesstoken and have expiresat and date of now is before expiresat
  //Date.now()/1000 to make time in seconds as it return in millesecond
  //Number(expiresat) expiresat return in string that change in number 
  if (accesstoken&&expiresat&&Date.now()/1000<Number(expiresat)) {
    req=req.clone({
      setHeaders: {
  Authorization: `Bearer ${accesstoken}`,
},
    })
  }
  return next(req).pipe(
  catchError((error) => {
    if (error.status === 401) {
      const refreshToken = authService.getrefreshtoken();

      return authService.newtoken({
        refresh_token: refreshToken,
      }).pipe(
        switchMap((res) => {
        authService.setaccesstoken(res.access_token);
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${res.access_token}`,
            },
          });

          return next(req);
        })
      );
    }

    return throwError(() => error);
  })
);
};
