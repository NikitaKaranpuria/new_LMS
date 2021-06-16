import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import Spinner from "./views/spinner/Spinner";


// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const ForgotPassword = React.lazy(() => import('./views/pages/forgot/ForgotPassword'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const ChangePassword = React.lazy(() => import('./views/pages/ChangePassword/ChangePassword'));

const EditUser = React.lazy(() => import("./views/pages/register/EditUser"));
window.onunload = () => {
  // Clear the local storage
localStorage.removeItem('upcommingtab')
localStorage.removeItem('mypurchasetab')

}
class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/sign_in" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/sign_up" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/forgot_password" name="Register Page" render={props => <ForgotPassword {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route exact path="/changePassword" name="Change Password" render={props => <ChangePassword {...props} />} />
            <Route exact path="/edit_profile/:id" name="EditUser" render={props => <EditUser {...props} />} />


            <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
