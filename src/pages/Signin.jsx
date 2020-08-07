import React from "react";
import FormSignin from "../components/Forms/FormSignin";
import "../styles/signin.css";

const Signin = (props) => {
  console.log(props);
  return <FormSignin {...props} />;
};

export default Signin;
