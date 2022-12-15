// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'noteapp-28d30',
    appId: '1:107122058357:web:250336ba6cfb880077c43c',
    storageBucket: 'noteapp-28d30.appspot.com',
    apiKey: 'AIzaSyA566nAa6PPLhL67s67tA_2S8bteREeZ-0',
    authDomain: 'noteapp-28d30.firebaseapp.com',
    messagingSenderId: '107122058357',
  },
  production: false,
  endpoint: 'http://localhost:3001/'//Root connection to API
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
