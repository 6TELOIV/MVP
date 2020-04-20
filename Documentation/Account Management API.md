# Account Management API

# Sign In

Method: POST

URL: /api/signin

### Submitted Data

    {
        "email": "johnsmith@gmail.com", //Required
    		"password": "password" //Required
    }

### Returned Data

    {
        "name": "John Smith",
    		"username": "johnsmith@gmail.com",
        "house": 1,
        "sign": 3
    }

### Errors

- `Username not found`: 500 at `database`
- `Database connection issue`: 500 at `database`
- `Bad Request`: 400 at `request` #Did not include a password in request
- `Unauthorized`: 401 at `password`  #Incorrect Password

# Sign Up

Method: POST

URL: /api/signup

### Submitted Data

    {
        "address": "Gainesville, Florida", //Required
        "name": "Billy Bob",
        "email": "billybob@email.com", //Required
    		"password": "password" //Required
        "birthday": 94514760 //Required
    }

Birthday is the number of seconds since the Unix Equinox. To get it from a JavaScript Date object, say `date`, use `Math.floor(date.getTime() / 1000)`

### Returned Data

None

### Errors

- `Username taken`: 400 at `database`
- `Database write error`: 500 at `database`
- `House/Sign Calculation Error`: 500 at `swisseph`

# Checking Signed In Status

Method: GET

URL: /api/issignedin

### Submitted Data

None

### Returned Data

`true` or `false` if the user is or isn't signed in, respectively

### Errors

None

# Getting User Data

Method: GET

URL: /api/getUserInfo

### Submitted Data

None

### Returned Data

    {
        "name": "John Smith",
        "username": "johnsmith@gmail.com",
        "house": 1,
        "sign": 3,
        "horoscope": {
    				"sign": 1,
    				"house": 3,
    				"moonPhase": 5,
    				"quote": "This push request will fix it, surely",
    				"quoteAuthor": "MVP",
    				"quoteSrc": "https://github.com/6XAM/MVP",
    				"summary": "Sums it up pretty well, yes indeed.",
    				"bestActivities": "Staying inside, social distancing, coding",
    				"moonThemes": "Brightness, energy",
    				"signThemes": "Inovation",
    				"houseThemes": "Gryffindor"
    		},
        "preferences": {
    				/* Can be undefined, or have any number of key-value pairs*/
    		},
        "isGoogleAuth": true /* if the current user has authenticated with Google */
    }

### Errors

- `Username taken`: 400 at `database`
- `Database write error`: 500 at `database`
- `House/Sign Calculation Error`: 500 at `swisseph`