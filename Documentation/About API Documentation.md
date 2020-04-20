# About API Documentation

# Example Doc

The documentation for any API call should follow the spec below:

# Title

Method: Which HTTP method does this use?

URL: Where should the request be submitted?

### Submitted Data

What JSON object or query string should the request send, if any?

### Returned Data

What JSON object will the returned data look like, if any?

### Errors

- `Error Message`: Status at `Location`

## About Errors

All errors returned will be signaled by an error status, and most will have one or more messages in a JSON object like below:

    {
    	"errors": [
    		{
    			"location": "Where the error happened",
    			"msg": "What happened"
    		},
    		... // there can be zero, one or more errors
    		// Example of an error
    		{
    			"location": "database",
    			"msg": "Database connection issue"
    		}
    	]
    }