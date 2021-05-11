export const Auth = {
  isAuthenticated: true,

  authenticate() {
    Auth.isAuthenticated = true;
  },

  signout() {
    Auth.isAuthenticated = false;
  },
};
