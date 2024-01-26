import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResponseLogin } from '@models/auth.model';
import { TokenService } from '@services/token.service';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(username: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/usuarios/authenticate`, {
      username,
      password
    })
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.jwt);
        })
      );
  }
}
