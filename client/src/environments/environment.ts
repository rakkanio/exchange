// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:3000/api",
  assetUrl: "http://localhost:3000",
  ALERT_DESTROY_MAX_TIME: 8000,
  ALERT_DESTROY_MIN_TIME: 8000,
  ALGO_USDC_ASSET_ID: 31566704,
  WALLET_TYPE: {
    "ALGO_SIGNER": "ALGO_SIGNER",
    "MY_ALGO_WALLET": "MY_ALGO_WALLET",
    "WALLET_CONNECT": "WALLET_CONNECT"
  },
  ALGO_V2_MAINNET_URL:"https://mainnet-api.algonode.cloud",
  WALLET_CONNECT_BRIDGE_URL:"https://bridge.walletconnect.org"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
