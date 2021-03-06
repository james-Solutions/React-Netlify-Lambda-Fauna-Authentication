import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonToast,
  IonProgressBar,
} from "@ionic/react";

import {
  loginRequest,
  getIsAuth,
  getSendingLogin,
  getLoginError,
  getLoginErrorMessage,
} from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const sendingLogin = useSelector(getSendingLogin);
  const loginError = useSelector(getLoginError);
  const loginErrorMessage = useSelector(getLoginErrorMessage);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [inputToastError, setInputToastError] = useState<boolean>(false);
  const [loginSuccessfulToast, setLoginSuccessfulToast] = useState<boolean>(
    false
  );
  const [showEmailError, setShowEmailError] = useState<boolean>(false);

  const loginBtnHandler = (event: Event) => {
    if (
      showEmailError === false &&
      email !== undefined &&
      email !== "" &&
      password !== undefined &&
      password !== ""
    ) {
      // Everything is sanitized!!!
      setInputToastError(false);
      dispatch(loginRequest({ email: email, password: password }));
    } else {
      setInputToastError(true);
    }
  };

  // Generic email expression
  const emailExpress = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  // 8 to 15 characters which contain at least one lowercase letter,
  // one uppercase letter, one numeric digit, and one special character

  const emailInputHandler = (inputEmail: string) => {
    setEmail(inputEmail);
    if (email !== undefined) {
      if (emailExpress.test(inputEmail)) {
        setShowEmailError(false);
      } else {
        setShowEmailError(true);
      }
    }
  };

  const passwordInputHandler = (inputPassword: string) => {
    setPassword(inputPassword);
  };

  const errorStyle = {
    color: "red",
    padding: "0.5rem",
    fontStyle: "italic",
  };

  if (isAuth) {
    return <Redirect to="/home" />;
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Enter User Login Credentials:</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {/* Start basic user info */}
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  value={email}
                  onIonChange={(event) =>
                    emailInputHandler(event.detail.value!)
                  }
                  type="email"
                  pattern="email"
                  autocomplete="email"
                  required={true}
                ></IonInput>
              </IonItem>
              {showEmailError ? (
                <div style={errorStyle}>Invalid Email</div>
              ) : (
                <div />
              )}

              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  value={password}
                  onIonChange={(event) =>
                    passwordInputHandler(event.detail.value!)
                  }
                  type="password"
                  pattern="password"
                  autocomplete="new-password"
                  required={true}
                ></IonInput>
              </IonItem>
              {/* End Login Credential User Information */}
              {sendingLogin ? (
                <IonProgressBar type="indeterminate"></IonProgressBar>
              ) : (
                <div />
              )}
              {loginError ? (
                <IonItem>
                  <IonLabel color="danger">{loginErrorMessage}</IonLabel>
                </IonItem>
              ) : (
                <div />
              )}
              {/* Login Submit Button */}
              <IonButton
                expand="block"
                type="submit"
                onClick={(event: any) => {
                  loginBtnHandler(event);
                }}
                disabled={sendingLogin}
              >
                {loginError ? "Retry Login" : "Submit Login"}
              </IonButton>
              {/* End Content */}
            </IonCardContent>
          </IonCard>
          <IonToast
            isOpen={inputToastError}
            onDidDismiss={() => setInputToastError(false)}
            message="Please enter all information and in a valid format."
            duration={2500}
          />
          <IonToast
            isOpen={loginSuccessfulToast}
            onDidDismiss={() => setLoginSuccessfulToast(false)}
            message="Login Successful!"
            duration={2500}
          />
        </IonContent>
      </IonPage>
    );
  }
};
