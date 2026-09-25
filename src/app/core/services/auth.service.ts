import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private readonly httpClient =inject(HttpClient)
   private readonly cookieService = inject(CookieService)
  signup(data:object):Observable<any>{
    return this.httpClient.post(environment.baseurl+'/auth/v1/signup', data,
    {
      headers: {
        apikey: environment.apikey,
      },
    })
  }
   login(data:object):Observable<any>{
    return this.httpClient.post(environment.baseurl+'/auth/v1/token?grant_type=password',data,{
      headers: {
        apikey: environment.apikey,
      },
    })
  }
  newtoken(data:object):Observable<any>{
return this.httpClient.post(environment.baseurl+'/auth/v1/token?grant_type=refresh_token',data,{
      headers: {
        apikey: environment.apikey,
      },
    })
  }
  getaccesstoken(): string {
  return this.cookieService.get('access_token');
}
getrefreshtoken(): string {
  return this.cookieService.get('refresh_token');
}
getexpiresat(): string {
  return this.cookieService.get('expires_at');
}
setaccesstoken(token: string): void {
    this.cookieService.set('access_token', token);
  }
}



