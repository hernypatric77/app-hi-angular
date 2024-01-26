import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
   constructor() {

  }

  saveToken(token: string) {
    const expirationTimeInMinutes = 120;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expirationTimeInMinutes * 60 * 1000);
    setCookie('token-her', token, { expires: expirationDate, path: '/' });
  }


  getToken() {
    const token = getCookie('token-her');
    return token;
  }

  removeToken() {
    removeCookie('token-her');
  }
}
