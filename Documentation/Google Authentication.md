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
`GET /api/googleauth/callback?code={AUTH_CODE}&scope=https://www.googleapis.com/auth/calendar.events`

In this case, the code is what is starting after `code=` and before `&scope`. This code is exchanged with google for an authorization token and refresh token. The refresh token will allow us to always get an auth token from google without having to reauth with the user. An example token object is represented below

### Returned Data

    { //TOKEN RESPONSE (CODE -> TOKEN)
    	access_token: 'ya29.{REST_OF_ACCESS_TOKEN}',
    	refresh_token: '1//{REST_OF_REFRESH_TOKEN},
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
