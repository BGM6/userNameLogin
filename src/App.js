import React from 'react';
import { observer } from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginForm from '../src/componets/LoginForm';
import SubmitButton from '../src/componets/SubmitButton';
import './App.css';

class App extends React.Component {

  // When the app componet mounts after loading its going to check if the user is logged in or not
  // by checking session 
  async componentDidMount() {
    try {
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  // LOGOUT Function
  async doLogout() {
    try {
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {

    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">
            Loading, please wait...
          </div>
        </div>
      );
    }

    else {

      if (UserStore.isLoggedIn) {
        return (
          <div className="app">
            <div className="container">
              Welcome {UserStore.username}

              {/* Submit button for loggin out */}

              <SubmitButton
                text={'Log out'}
                disabled={false}
                onClick={() => this.doLogout()}
              />
            </div>
          </div>
        );
      }

    }
    return (
      <div className="app">
        <div className="container">
          <LoginForm />
        </div>
      </div>
    );
  }
}


// Wrapping the app in the observer allows the app to listen changes in the UserStore
export default observer(App);
