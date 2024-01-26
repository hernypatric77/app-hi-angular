import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  apiUrl = environment.API_URL;
  token1 = this.tokenService.getToken();
  constructor(private http: HttpClient,
              private tokenService: TokenService) { }

  private createHeader(){
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token1}`,
      'Content-Type': 'application/pdf'
    });
  }

  generatePdf(){
    const headers = this.createHeader();
    return this.http.get(`${this.apiUrl}/api/reports/transactions/download`,
      {responseType: 'blob', headers: headers, params: { exportType: 'PDF' }});
  }
}
