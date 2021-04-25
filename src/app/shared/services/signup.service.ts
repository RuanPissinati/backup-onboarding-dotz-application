import { Injectable } from '@angular/core'; import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NextStep, NextStepResponse } from './../models/signup.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  headers = {
    headers: new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("Authorization", `basic ${btoa(`${environment.SSO_CLIENT_ID_LP}:${environment.SSO_CLIENT_SECRET_LP}`)}`)
  }

  blockUser(workflowUniqueId: string): Observable<any> {
    return this.http.put<any>(`${environment.SIGNUP_API_DEFAULT}v4/blockuser?workflowUniqueId=${workflowUniqueId}`, null);
  }
  getUserIfos(doc) {
    return this.http.get<NextStepResponse>(`${environment.SIGNUP_API_DEFAULT}v5/workflow/userinfo/3/${doc}`);
  }
  nextStep(data: NextStep): Observable<NextStepResponse> {
    return this.http.post<NextStepResponse>(`${environment.SIGNUP_API_DEFAULT}v5/workflow/nextstep`, data, this.headers);
  }
  previousStep(data): Observable<any> {
    return this.http.post<NextStepResponse>(`${environment.SIGNUP_API_DEFAULT}v5/workflow/previousstep`, data, this.headers);
  }


}
