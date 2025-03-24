import React, { useContext, useState } from "react";
import Card from "../../UIELEMENTS/Card";
import Input from "../../../shared/FormElements/Input";
import Button from "../../../shared/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import ErrorModal from "../../UIELEMENTS/ErrorModal";
import LoadingSpinner from "../../UIELEMENTS/LoadingSpinner";
import { useHttpClient } from "../../../shared/hooks/http-hook"; // Import useHttpClient

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  const { isLoading, error, sendRequest, clearError } = useHttpClient(); // Use custom hook

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      // Switching to Login Mode - Remove 'name' field
      setFormData(
        {
          email: formState.inputs.email,
          password: formState.inputs.password
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      // Switching to Signup Mode - Add 'name' field
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false }
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const url = isLoginMode
        ? "http://localhost:5000/api/users/login"
        : "http://localhost:5000/api/users/signup";

      const requestBody = isLoginMode
        ? {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }
        : {
            name: formState.inputs.name?.value || "",
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          };

      const responseData = await sendRequest(url, "POST", JSON.stringify(requestBody), {
        "Content-Type": "application/json"
      });

      auth.login(responseData.user.id); // Ensure login is done with user ID
      console.log("Authenticated User:", responseData.user);
    } catch (err) {
      console.error("Authentication failed:", err);
    }
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
