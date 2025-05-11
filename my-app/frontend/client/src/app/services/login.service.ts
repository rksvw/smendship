import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'http://localhost:4000/graphql';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const query = `
    mutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          name
          email
        }
      }
    }
    `;

    const variables = { email, password };

    return this.http.post(this.loginUrl, { query, variables });
  }
}
