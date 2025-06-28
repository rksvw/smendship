import React, { Component } from "react";
import "./Login.css";

export default class LoginComponent extends Component {
  render() {
    return (
      <div className="login-wrapper">
        <div className="login-box">
          <h2>Login here!</h2>
          <form>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@hotmail.com"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*********"
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    );
  }
}
