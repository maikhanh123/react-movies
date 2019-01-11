import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };
  //   username = React.createRef();

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });
    console.log(result);
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required";
    if (account.password.trim() === "")
      errors.password = "Password is required";

    return Object.keys(errors).length === 0 ? {} : errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({
      errors
      //   errors: errors || {}
    });
    if (this.state.errors) return;

    console.log("Submit");
  };

  //   componentDidMount = () => {
  //       this.username.current.focus();
  //   }

  validateProperty = input => {
    if (input.name === "username") {
      if (input.value.trim() === "") return "Username is required";
    }

    if (input.name === "password") {
      if (input.value.trim() === "") return "Password is required";
    }
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const account = { ...this.state.account };
    // account.username = e.currentTarget.value;
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      account,
      errors
    });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={this.state.account.username}
            type="text"
            autoFocus
            label="Username"
            onChange={this.handleChange}
            error={this.state.errors.username}
          />
          <Input
            name="password"
            value={this.state.account.password}
            type="password"
            label="Password"
            onChange={this.handleChange}
            error={this.state.errors.password}
          />

          <button onClick={this.handleSubmit} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
