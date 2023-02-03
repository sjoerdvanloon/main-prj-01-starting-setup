export default {
  //setAuth: (state, payload) =>
  logIn: (state) => (state.loggedIn = true),
  logOut: (state) => {
    console.log('mutations', 'logOut', state);
    state.loggedIn = false;
  },
};
