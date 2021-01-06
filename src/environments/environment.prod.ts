export const environment = {
  production: true,
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

