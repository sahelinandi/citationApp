// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8086',
  pageSizeOptions: [       
    // {
    //     "index": 5
    // },
    {
        "index": 10
    },
    {
        "index": 20
    },
    {
        "index": 30
    },
    {
        "index": 40
    },
    {
        "index": 50
    }
],
LoginURL: 'https://login-stg.pwc.com/openam/oauth2/authorize',
response_type: 'code',
client_id: 'urn:citationapp:dev',
redirect_uri: 'http://localhost:55000/index.html',
secret_key:'pYG6AlRqmvxnO1ezWoS5',
scope:'profile',
grant_type: 'authorization_code',
access_token:'https://login-stg.pwc.com/openam/oauth2/access_token',
user_info:'https://login-stg.pwc.com/openam/oauth2/userinfo'
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
