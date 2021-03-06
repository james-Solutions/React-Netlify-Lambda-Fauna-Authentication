// Ion Imports
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

// Component Imports
import Menu from "./components/Menu";
import { Home } from "./components/scheduler/Home";
import { Registration } from "./components/user/Registration";
import { Login } from "./components/user/Login";
import { Logout } from "./components/user/Logout";
import { Verify } from "./components/user/Verify";
import { ApprovalQueue } from "./components/user/ApprovalQueue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/user/login" />
            </Route>
            <Route path="/home" exact={true} component={Home} />
            <Route path="/user/login" exact={true} component={Login} />
            <Route path="/user/logout" exact={true} component={Logout} />
            <Route
              path="/user/register"
              exact={true}
              component={Registration}
            />
            <Route path="/user/verify/:email" component={Verify} />
            <Route path="/approve" exact={true} component={ApprovalQueue} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
