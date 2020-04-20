# Google Authentication

# Original Authorization

Method: GET

URL: /api/googleauth

### Redirects:

If a user has already authorized us with their Google Account, they will be redirected to the user dashboard. This ensures that we don't have issues with users accidentally accessing the oauth protocols. 

### Submitted Data

None in the request. Instead, the user is redirected to a link showing a consent screen. 

An example screen is shown below: 

![Google%20Authentication/Untitled.png](Google%20Authentication/Untitled.png)

### Next Stage, Callback

Once a user allows the calendar scope for "Heavenly Writing LLC", the user is forwarded to the callback URL (`/api/googleauth/callback`) where token access is granted.

On the backend, we exchange a Google Authorization Code parsed from the URL 

**Example URL**: 
`GET /api/googleauth/callback?code=4/ygHDdrzTQWss9Ngd28SO2XYwN5gJfC4xy9dtVhCiK4hghC8TuEKJQIf_zr6KADziVPY8dzvVaB7xeTAHfnLcTmI&scope=https://www.googleapis.com/auth/calendar.events`

In this case, the code is what is in blue. This code is exchanged with google for an authorization token and refresh token. The refresh token will allow us to always get an auth token from google without having to reauth with the user. An example token object is represented below

### Returned Data

    { //TOKEN RESPONSE (CODE -> TOKEN)
    	access_token: 'ya29.a0Ae4lvC2fDIaFpKKAeRXLBUykwOx99geJhKTFjZptGGrxcFU-dEBeNJJBzo1lkDDc034CkzLmmXtUvusaQ1HLIuuqz9DsvxDUlI_-E-ejeCkqTJJdkMa26B5ShcWfW6CSuOiiCzSnahXhMNOR8xi-_uWAaE85ICIndRA',
    	refresh_token: '1//01RPMPWlaOZBACgYIARAAGAESNwF-L9IrZIMGnu5RAybcNgcjek9Xs06D8BXvpy7RR6EjjAQKDkedTf3SuqDRvMypHmj3Pg2xlvA',
    	scope: '[https://www.googleapis.com/auth/calendar](https://www.googleapis.com/auth/calendar)',
    	token_type: 'Bearer',
    	expiry_date: 1586817307377
    }

Once a user is authorized, the `OAuth2Client` object can be passed in as the `auth` parameter and calendar events can be obtained, edited, and created. 

For our usage, events will be added via a CRON Job to put horoscope entries into the Calendar.

### Errors

- `Database write error`: 500 at `database`

# DeAuthorization

Method: GET

URL: /api/googledeauth

### Submitted Data

None

### Returned Data

    {
        "Google DeAuthorized"
    }
    

### Errors

- `Database write error`: 500 at `database`