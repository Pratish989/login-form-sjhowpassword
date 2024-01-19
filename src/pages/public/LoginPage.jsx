/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const registeredUsers = [
  {
    email: "admin@example.com",
    password: "Admin123#",
  },
  {
    email: "pratish989@gmail.com",
    password: "MicrosofT@@99",
  },
  {
    email: "abc@example.co.uk",
    password: "ABCabc_@10",
  },
  {
    email: "disposable.style.email.with+symbol@example.com",
    password: "disPOSE&123",
  },
  {
    email: "mattGray@labor.de",
    password: "9matt%Gray",
  },
];

function Input(props) {
  return (
    <input
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      required={props.required}
      onBlur={props.onBlur}
      style={props.style}
      tag = {props.tag}
      />
  );
}


function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyEmailError, setEmptyEmailError] = useState(false);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [registryErrorMessage, setRegistryErrorMessage] = useState("");
  const [focusInputEmail, setFocusInputEmail] = useState(false);
  const [focusInputPassword, setFocusInputPassword] = useState(false);
  const[type, setType] = useState('password')

  const emailRegex =/[^-|_`''''"\\|+()&*%^#$@=/\d/g]+[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isValidEmail = emailRegex.test(email);

  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  const isValidPassword = passwordRegex.test(password);

  const togglePassword =()=>{
    if(type === 'password'){
      setType('text')
    }else{
      setType('password')
    }
  }
  

  const submitLogin = (event) => {
    event.preventDefault();
    !isValidEmail ? setEmailError(true) : setEmailError(false);
    !isValidPassword ? setPasswordError(true) : setPasswordError(false);

    if (email === "") {
      setEmptyEmailError(true);
      setEmailError(false);
    }

    if (password === "") {
      setEmptyPasswordError(true);
      setPasswordError(false);
    }

    if (isValidEmail && isValidPassword) {
      console.log("both fields validated");
    }

    let emailObj = registeredUsers.find((user) => user.email === email);

    if (emailObj === undefined) {
      setRegistryErrorMessage("User not registered with us");
      setFocusInputEmail(true);
      setFocusInputPassword(false);
      console.log("not registered with us");
    } else {
      if (emailObj.password === password) {
        console.log("youre logged in");
        onLogin();
        navigate("/home");
      } else {
        console.log("password is wrong");
        setRegistryErrorMessage("Password is Wrong");
        setFocusInputPassword(true);
        setFocusInputEmail(false);
      }
    }
  };

  const InputStyleEmail = {
    borderColor: emailError || emptyEmailError || focusInputEmail ? "red" : null,
  };

  const InputStylePassword = {
    borderColor:passwordError || emptyPasswordError || focusInputPassword ? "red" : null,
  };

  return (
    <div className="login-form">
      <h2>Login Form 💼</h2>
      <form onSubmit={submitLogin}>
        <Input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
            setEmptyEmailError(false);
            setEmailError(false);
          }}
          style={InputStyleEmail}
          onBlur={() => {
            if (email === "") {
              setFocusInputEmail(true);
              setEmptyEmailError(true);
            }
            if (!isValidEmail && email !== "") {
              console.log("email not valid and not zero");
              setEmailError(true);
              setFocusInputEmail(false);
            }
          }}
          tag= "i"
        />
        {emptyEmailError && (
          <p style={{ color: "red" }}> Email Address Required</p>
        )}
        {emailError && <p style={{ color: "red" }}>Invalid Email Format</p>}
        <br />
        <Input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
            setEmptyPasswordError(false);
            setPasswordError(false);
          }}
          style={InputStylePassword}
          onBlur={() => {
            if (password === "") {
              setFocusInputPassword(true);
              setEmptyPasswordError(true);
            } else if (!isValidPassword && password !== "") {
              setPasswordError(true);
              setFocusInputPassword(false);
              setFocusInputEmail(false);
            }
          }}
       
          />
          <i onClick={togglePassword}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
          </i>
        {emptyPasswordError && (
          <p style={{ color: "red" }}> Password Required</p>
        )}
        {passwordError && (
          <p style={{ color: "red" }}>Invalid Password Format</p>
        )}
        <br />
        {<p style={{ color: "red" }}> {registryErrorMessage} </p>}
        <button
          disabled={!isValidEmail || !isValidPassword}
          onClick={() => console.log("button clicked")}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
