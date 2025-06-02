import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Fetching the backend
  private loginUrl = 'http://localhost:4000/graphql';

  // Http Methods and functionality
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const query = `mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token
    user {
    id
    name
    email
    }
    }
    }`;

    const variables = { email, password };
    return this.http.post(this.loginUrl, { query, variables });
  }

}
