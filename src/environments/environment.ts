// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server : {
    esb: 'http://localhost:8080/'
  },
  security: {
    accountid: '7klyaxar45jcz2xzwbmha65bdyboa6ip',
    key: '',
    iv: '',
    algo: 'AES'
  }
};
