import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Companystock } from '../model/companystock';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private apiServerUrl = environment.apiBaseUrl; //'http://localhost:8080'

  constructor(private http: HttpClient) {}

  /**
   *  Returns observable of http request to api for company stocks
   **/
  public getStocks(): Observable<Companystock[]> {
    return this.http.get<Companystock[]>(
      `${this.apiServerUrl}/company/companystock`
    );
  }
}
