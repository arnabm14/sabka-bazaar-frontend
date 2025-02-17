import React, { useState } from "react";
import "./Auth.scss";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const intialState = {
    firstName: "",
    lastName: "",
    petName: "",
    petType: "",
    email: "",
    password: "",
    confirmPwd: "",
  };
  const [userDetails, setUserDetails] = useState(intialState);
  const [validation, setValidation] = useState({
    statusErrorMessage: "",
    statusSuccessMessage: "",
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    const emailReg = /\S+@\S+\.\S+/;
    const pwdReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (
      userDetails.firstName &&
      userDetails.email &&
      userDetails.password &&
      userDetails.petType
    ) {
      if (userDetails.password === userDetails.confirmPwd) {
        if (pwdReg.test(userDetails.password)) {
          if (emailReg.test(userDetails.email)) {
            sessionStorage.setItem(
              "name",
              userDetails.firstName + " " + userDetails.lastName
            );
            sessionStorage.setItem("petname", userDetails.petName);
            sessionStorage.setItem("pettype", userDetails.petType);
            sessionStorage.setItem("email", userDetails.email);
            sessionStorage.setItem("password", userDetails.password);
            sessionStorage.setItem("status", "");
            setValidation({
              ...validation,
              statusSuccessMessage: "User registered successfully",
              statusErrorMessage: "",
            });
            setUserDetails(intialState);
            setTimeout(() => history.push("/login"), 5000);
          } else {
            showError("Invalid email id");
          }
        } else {
          showError(
            "Password must contain minimum eight characters, at least one letter, one number and one special character"
          );
        }
      } else {
        showError("Passwords do not match");
      }
    } else {
      showError("Please provide First name, Email, Pet Type & Password");
    }
  };

  const showError = (msg) => {
    setValidation({
      ...validation,
      statusErrorMessage: msg,
    });
  };

  return (
    <div className="register">
      <aside>
        <h1>Signup</h1>
        <p>We do not share your personal details with anyone</p>
        <p>
          ( Because we are a startup and we do not have anyone to share details
          with ;-; )
        </p>
        <p>
          Feel free to share and help us grow, we swear we still would'nt share
          your details with anyone{" "}
        </p>
      </aside>
      <section className="register-form">
        <form onSubmit={onFormSubmit}>
          <input
            placeholder="First name *"
            required
            value={userDetails.firstName}
            onChange={(event) =>
              setUserDetails({ ...userDetails, firstName: event.target.value })
            }
          />
          <input
            placeholder="Last name"
            value={userDetails.lastName}
            onChange={(event) =>
              setUserDetails({ ...userDetails, lastName: event.target.value })
            }
          />
          <input
            placeholder="Pet Name(s)"
            value={userDetails.pet}
            onChange={(event) =>
              setUserDetails({ ...userDetails, petName: event.target.value })
            }
          />
          <input
            placeholder="Pet Type (Cat/Dog) *"
            required
            value={userDetails.pet}
            onChange={(event) =>
              setUserDetails({ ...userDetails, petType: event.target.value })
            }
          />
          <input
            placeholder="Email *"
            required
            value={userDetails.email}
            onChange={(event) =>
              setUserDetails({ ...userDetails, email: event.target.value })
            }
          />
          <input
            placeholder="Password *"
            type="password"
            required
            value={userDetails.password}
            onChange={(event) =>
              setUserDetails({ ...userDetails, password: event.target.value })
            }
          />
          <input
            placeholder="Confirm Password *"
            type="password"
            required
            value={userDetails.confirmPwd}
            onChange={(event) =>
              setUserDetails({ ...userDetails, confirmPwd: event.target.value })
            }
          />
          <p
            style={{
              color: validation.statusErrorMessage ? "red" : "green",
              textAlign: "center",
            }}
          >
            {validation.statusErrorMessage || validation.statusSuccessMessage}
          </p>
          <button>Sign up</button>
        </form>
      </section>
    </div>
  );
};

export default Register;
