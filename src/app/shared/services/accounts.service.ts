import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(
    private http: HttpClient
  ) { }

  smsToken(transactionid: string, key: string): Observable<any> {
    return this.http.put<any>(`${environment.ACCOUNTS_API}v2/mfa/${transactionid}/send?optionId=${key}`, {});
  }

  getIdentifiers(document: string) {
    return this.http.get(`${environment.ACCOUNTS_API}v2/mfa/${document}`);
  }

  getUnconfirmedIndentifiers(document: string) {
    return this.http.get(`${environment.ACCOUNTS_API}v2/mfa/unconfirmed/${document}`);
  }

}
