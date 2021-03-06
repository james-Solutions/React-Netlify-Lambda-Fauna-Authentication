import React, { useState } from "react";
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
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  IonItemDivider,
  IonToast,
  IonProgressBar,
  IonText,
} from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import {
  registrationRequest,
  getRegistrationSuccess,
  getSendingRegistration,
  getRegistrationErrorMessage,
} from "../../redux/slices/userSlice";
import * as constants from "../../constants";

export const Registration: React.FC = () => {
  const dispatch = useDispatch();
  const registrationSuccess = useSelector(getRegistrationSuccess);
  const registrationInProgress = useSelector(getSendingRegistration);
  const registrationError = useSelector(getRegistrationErrorMessage);
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [verifyPassword, setVerifyPassword] = useState<string>();
  const [selected, setSelected] = useState<string>("Student");

  const [inputToastError, setInputToastError] = useState<boolean>(false);
  const [
    registrationSuccessfulToast,
    setRegistrationSuccessfulToast,
  ] = useState<boolean>(false);
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
  const [
    showPasswordsNotMatchError,
    setShowPasswordsNotMatchError,
  ] = useState<boolean>(false);
  const [showUsernameError, setShowUsernameError] = useState<boolean>(false);

  const registrationBtnHandler = (event: Event) => {
    if (
      showEmailError === false &&
      showUsernameError === false &&
      showPasswordError === false &&
      showPasswordsNotMatchError === false &&
      email !== undefined &&
      email !== "" &&
      username !== undefined &&
      username !== "" &&
      password !== undefined &&
      password !== "" &&
      verifyPassword !== undefined &&
      verifyPassword !== ""
    ) {
      // Everything is sanitized!!!
      setInputToastError(false);
      dispatch(
        registrationRequest({
          username: username,
          email: email,
          password: password,
          accessLevel: selected,
        })
      );
    } else {
      setInputToastError(true);
    }
  };

  // Generic email expression
  const emailExpress = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // 8 to 15 characters which contain at least one lowercase letter,
  // one uppercase letter, one numeric digit, and one special character
  const passwordExpress = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  // Uppercase, lowercase and numbers are allowed for username
  const usernameExpress = /^[a-zA-Z0-9]+$/;

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

  const usernameInputHandler = (inputUsername: string) => {
    setUsername(inputUsername);
    if (username !== undefined) {
      if (usernameExpress.test(inputUsername)) {
        setShowUsernameError(false);
      } else {
        setShowUsernameError(true);
      }
    }
  };

  const passwordInputHandler = (inputPassword: string) => {
    setPassword(inputPassword);
    if (password !== undefined) {
      if (passwordExpress.test(inputPassword)) {
        setShowPasswordError(false);
      } else {
        setShowPasswordError(true);
      }
    }
  };

  const verifyPasswordInputHandler = (inputVerifyPassword: string) => {
    setVerifyPassword(inputVerifyPassword);
    if (verifyPassword !== undefined && password !== undefined) {
      if (password !== inputVerifyPassword) {
        setShowPasswordsNotMatchError(true);
      } else {
        setShowPasswordsNotMatchError(false);
      }
    }
  };

  const clearAllInput = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setVerifyPassword("");
    setSelected("Student");
  };

  const errorStyle = {
    color: "red",
    padding: "0.5rem",
    fontStyle: "italic",
  };

  if (registrationSuccess === false) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Registration</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Enter New User Information:</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {/* Start basic user info */}
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  value={email}
                  disabled={registrationInProgress}
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
                <IonLabel position="floating">Username</IonLabel>
                <IonInput
                  value={username}
                  disabled={registrationInProgress}
                  onIonChange={(event) =>
                    usernameInputHandler(event.detail.value!)
                  }
                  required={true}
                ></IonInput>
              </IonItem>
              {showUsernameError ? (
                <div style={errorStyle}>
                  Invalid Username, may only contain letters and digits
                </div>
              ) : (
                <div />
              )}
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  value={password}
                  disabled={registrationInProgress}
                  onIonChange={(event) =>
                    passwordInputHandler(event.detail.value!)
                  }
                  type="password"
                  pattern="password"
                  autocomplete="new-password"
                  required={true}
                ></IonInput>
              </IonItem>
              {showPasswordError ? (
                <div style={errorStyle}>
                  Invalid Password. Password must be 8 to 15 characters which
                  contain at least one lowercase letter, one uppercase letter,
                  one numeric digit, and one special character
                </div>
              ) : (
                <div />
              )}
              <IonItem>
                <IonLabel position="floating">Verify Password</IonLabel>
                <IonInput
                  disabled={registrationInProgress}
                  value={verifyPassword}
                  onIonChange={(event) =>
                    verifyPasswordInputHandler(event.detail.value!)
                  }
                  type="password"
                  pattern="password"
                  autocomplete="new-password"
                  required={true}
                ></IonInput>
              </IonItem>
              {showPasswordsNotMatchError ? (
                <div style={errorStyle}>
                  Passwords do <u>NOT</u> match
                </div>
              ) : (
                <div />
              )}
              {/* End Basic User Information */}
              {/* Start Access Level Radio Group */}
              <IonRadioGroup
                value={selected}
                onIonChange={(e) => setSelected(e.detail.value)}
              >
                <IonListHeader>
                  <IonLabel>Requested Access Level</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>Student</IonLabel>
                  <IonRadio
                    disabled={registrationInProgress}
                    slot="start"
                    value="Student"
                  />
                </IonItem>

                <IonItem>
                  <IonLabel>Administrator</IonLabel>
                  <IonRadio
                    disabled={registrationInProgress}
                    slot="start"
                    value="Administrator"
                  />
                </IonItem>

                <IonItem>
                  <IonLabel>Root</IonLabel>
                  <IonRadio
                    disabled={registrationInProgress}
                    slot="start"
                    value="Root"
                  />
                </IonItem>
              </IonRadioGroup>
              <IonItemDivider>Your Requested Access Level:</IonItemDivider>
              <IonItem>{selected ?? "(none selected"}</IonItem>
              {/* End Access Level Radio Group */}
              {registrationInProgress ? (
                <IonItem>
                  <IonLabel>Sending Registration</IonLabel>
                  <IonProgressBar type="indeterminate"></IonProgressBar>
                </IonItem>
              ) : (
                ""
              )}
              {registrationError ? (
                <IonItem>
                  <IonLabel color="danger">{registrationError}</IonLabel>
                </IonItem>
              ) : (
                ""
              )}
              {/* Registration Submit Button */}
              <IonButton
                expand="block"
                type="submit"
                disabled={registrationInProgress}
                onClick={(event: any) => {
                  registrationBtnHandler(event);
                }}
              >
                Submit Registration
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
            isOpen={registrationSuccessfulToast}
            onDidDismiss={() => setRegistrationSuccessfulToast(false)}
            message="Registration Successful!"
            duration={2500}
          />
        </IonContent>
      </IonPage>
    );
  } else if (registrationSuccess === true && registrationInProgress === false) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Registration</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Registration Request Successful</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText style={{ display: "block" }}>
                You must now verify your email account.
              </IonText>
              <br />
              <IonText style={{ display: "block" }}>
                An email will be sent with a one time code that lasts 24 hours
                to complete your verification. Then you will be able to login.
              </IonText>
              <br />
              {selected !== constants.USER.ACCESS_LEVELS.STUDENT ? (
                <IonText style={{ display: "block" }}>
                  You have requested a {selected} account. This requires
                  approval and verification. You will be notified via email upon
                  your approval or rejection.
                </IonText>
              ) : (
                ""
              )}
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  } else {
    return <IonPage></IonPage>;
  }
};
