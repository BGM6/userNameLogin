import { extendObservable } from 'mobx';

// UserStore

class UserStore {
  constructor() {
    extendObservable(this, {

      loading: true,
      isLoggedin: false,
      username: '',
    });
  }
}

export default new UserStore();