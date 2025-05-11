// import {defineStore} from 'pinia';
// import AuthService from '@/services/auth.service';
//
// interface AuthState {
//   status: { loggedIn: boolean };
//   user: any | null;
// }
//
// export const useAuthStore = defineStore('auth', {
//   state: (): AuthState => {
//     const user = JSON.parse(localStorage.getItem('user') || 'null');
//     return user
//       ? {status: {loggedIn: true}, user}
//       : {status: {loggedIn: false}, user: null};
//   },
//
//   actions: {
//     async login(user: any) {
//       try {
//         const loggedInUser = await AuthService.login(user);
//         this.loginSuccess(loggedInUser);
//         return loggedInUser;
//       } catch (error) {
//         this.loginFailure();
//         return Promise.reject(error);
//       }
//     },
//
//     logout() {
//       AuthService.logout();
//       this.logoutState();
//     },
//
//     async register(user: any) {
//       try {
//         const response = await AuthService.register(user);
//         this.registerSuccess();
//         return response.data;
//       } catch (error) {
//         this.registerFailure();
//         return Promise.reject(error);
//       }
//     },
//
//     loginSuccess(user: any) {
//       this.status.loggedIn = true;
//       this.user = user;
//     },
//
//     loginFailure() {
//       this.status.loggedIn = false;
//       this.user = null;
//     },
//
//     logoutState() {
//       this.status.loggedIn = false;
//       this.user = null;
//     },
//
//     registerSuccess() {
//       this.status.loggedIn = false;
//     },
//
//     registerFailure() {
//       this.status.loggedIn = false;
//     }
//   },
//
//   persist: true // Automatically persist state in localStorage or another storage
// });
