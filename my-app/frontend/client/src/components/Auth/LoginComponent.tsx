import { Component } from "react";
import "./Login.css";

export default class LoginComponent extends Component {
  constructor(props: object) {
    super(props);

    this.state = {
      email: "",
      password: "",
      token: "",
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private loginUrl = "http://localhost:4000/graphql";

  handleChange(e) {
    const _id = e.target.id;
    const _value = e.target.value;
    if (_id === "email") {
      this.setState({
        email: _value,
      });
    } else {
      this.setState({
        password: _value,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const callLoginService = async () => {
      const res = await fetch(this.loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
              user {
                id
                name
              }
            }
          }
        `,
          variables: { email: this.state.email, password: this.state.password },
        }),
      });

      const result = await res.json();

      if (result.errors) {
        this.setState({
          error: result.errors[0].message,
        });
      } else {
        this.setState({
          token: result.data.login.token,
        });
        localStorage.setItem("token", result.data.login.token);
        this.setState({
          error: "",
        });
      }
    };

    callLoginService();
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-box">
          <h2
            style={{
              textAlign: "center",
              borderBottom: "2px solid black",
              padding: "0px 0px 2px 0px",
            }}
          >
            Login here!
          </h2>
          <br />
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="example@hotmail.com"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
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
