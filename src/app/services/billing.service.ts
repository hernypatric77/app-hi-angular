import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {FacturaModel} from "@models/factura.model";
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  apiUrl = environment.API_URL;
  token1 = this.tokenService.getToken();

  constructor(private http: HttpClient,
  private tokenService: TokenService
  ) { }

   private createHeader(){
    return new HttpHeaders().set('Authorization', `Bearer ${this.token1}`);
  }
  findFactura(){

     const headers = this.createHeader();
    return this.http.get<FacturaModel[]>(`${this.apiUrl}/api/factura/`, { headers });
  }

  savefactura(data: any){
    const headers = this.createHeader();
    return this.http.post<FacturaModel[]>(`${this.apiUrl}/api/factura`, data,{ headers });
  }

  editFactura(data: any, id: string) {
    const headers = this.createHeader();
    return this.http.put<FacturaModel[]>(`${this.apiUrl}/api/factura/${id}`, data,{ headers });
  }
}
