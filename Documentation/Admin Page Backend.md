# Admin Page Backend

## ***There is a check for these requests such that only users with the isAdmin boolean true can receive data. This ensures that even if someone tried to access the administrator console, they could not edit the data or get the horoscope list.***

# Get Entries

Method: GET

URL: /api/admin

### Submitted Data

None

### Returned Data

    [ //Returns an array of all of the horoscope objects in JSON format
        {
            "_id": "5e75672ec96b0f9094b48ef9",
            "sign": 1,
            "house": 1,
            "moonPhase": 1,
            "quote": "This is a quote",
            "quoteAuthor": "Author",
            "quoteSrc": "http://foo.com/blah_blah/",
            "summary": "Short summary",
            "bestActivities": "Activities",
            "moonThemes": "Moon Themes",
            "signThemes": "Sign Themes",
            "houseThemes": "House Themes",
            "__v": 0
        } 
    ]

### Errors

- `Database read error`: 500 at `database`

# Update Entry

Method: PUT

URL: /api/admin

### Submitted Data

    { //The request must have a valid JSON object with all of the following parameters
    		"sign": 1,
        "house": 1,
        "moonPhase": 1,
        "quote": "This is a new quote",
        "quoteAuthor": "Author",
        "quoteSrc": "http://foo.com/blah_blah/",
        "summary": "Short summary",
        "bestActivities": "Activities",
        "moonThemes": "Moon Themes",
        "signThemes": "Sign Themes",
        "houseThemes": "House Themes"
    }

### Returned Data

    "Edit Successful"

### Errors

- `Database write error`: 500 at `database`

# Master Horoscope Database Reset

Method: POST

URL: /api/admin

### Submitted Data

    { 
    		"resetPassword": "Heavenly Writing"
    }

### Returned Data

    "Success"

### Initialized Values for Each Horoscope Entry

    {   //There is a unique DB entry for each
    		//Combination of Sign, House, and Moon Phase
    		sign: <Value 1-12>, 
    		house: <Value 1-12>, 
    		moonPhase: <Value 1-8>, 
    		quote: "Placeholder quote",	
    		quoteAuthor: "Placeholder quote author", 
    		quoteSrc: "http://www.placeholderWebsite.com",	
    		summary: "Placeholder summary",
    		bestActivities: "Placeholder best activities",
    		moonThemes: "Placeholder moon themes", 
    		signThemes: "Placeholder sign themes", 
    		houseThemes: "Placeholder house themes"
    }

### Errors

- `Database write error`: 500 at `database`
- `Incorrect reset password. Reset failed`: 500 at `password`