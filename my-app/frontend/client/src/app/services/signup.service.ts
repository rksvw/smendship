import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private signupUrl = 'http://localhost:4000/graphql';

  constructor(private http: HttpClient) {}

  signUp(name: string, email: string, password: string): Observable<any> {
    const query = `mutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
    token
    user {
    id
    name
    email
    }
    }
    }`;

    const variables = { name, email, password };
    return this.http.post(this.signupUrl, { query, variables });
  }
}
