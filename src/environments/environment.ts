// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  liquidLongContractAddress: '0x80F8DAA435A9AB4B1802BA56FE7E0ABD0F8AB3D3',
  ethPricePollingFrequency: 3000,      // frequency in milliseconds
  providerFeePollingFrequency: 3000,   // frequency in milliseconds
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
