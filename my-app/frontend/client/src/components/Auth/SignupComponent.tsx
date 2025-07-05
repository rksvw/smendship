import { Component } from "react";
import "./Signup.css";

export default class SignupComponent extends Component {
  constructor(props: object) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      loading: "",
      token: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private signupURL = "http://localhost:4000/graphql";

  handleChange = (e) => {
    const _id = e.target.id;
    const _value = e.target.value;
    if (_id === "name") {
      this.setState({
        name: _value,
        error: "",
      });
    } else if (_id === "email") {
      this.setState({
        email: _value,
        error: "",
      });
    } else {
      this.setState({
        password: _value,
        error: "",
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const callSignupService = async () => {
      const res = await fetch(this.signupURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `mutation Signup($name: String!, $email: String!, $password: String!) {
            signup(name: $name, email: $email, password: $password) {
              token
              user {
                id
                name
                email
              }
            }
          }`,
          variables: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
          },
        }),
      });

      const result = await res.json();

      if (res.ok) {
        this.setState({
          token: result.data.signup.token,
        });

        localStorage.setItem("token", result.data.signup.token);

        this.setState({
          error: "",
        });
      } else {
        this.setState({
          error: "Error occured!",
        });
      }
    };

    callSignupService();
  };

  render() {
    return (
      <div className="s_box">
        <div className="s_card">
          <h2>Signup here!</h2>
          <br />
          <form className="s_form" onSubmit={this.handleSubmit}>
            <div className="s_name">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
                placeholder="Enter your name"
              />
            </div>
            <div className="s_email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={this.handleChange}
                value={this.state.email}
                placeholder="Enter your email"
              />
            </div>
            <div className="s_pass">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
                value={this.state.password}
                placeholder="Enter strong password"
              />
            </div>
            <button className="s_sumbit" type="submit">
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  }
}
