import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Authreqest } from '../interfaces/authreqest.interface';
import { Authresponce } from '../interfaces/authresponce.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private readonly httpClient =inject(HttpClient)
  signup(data:object):Observable<any>{
    return this.httpClient.post(environment.baseurl+'/auth/v1/signup', data,
    {
      headers: {
        apikey: environment.apikey,
      },
    })
  }
   login(data:object):Observable<any>{
    return this.httpClient.post(environment.baseurl+'/auth/v1/token?grant_type=password',data)
  }
}



