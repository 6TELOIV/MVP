import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {TextField} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10%',
    },

    headline: {
       textAlign: 'center',
    },

    avatar: {
        margin: theme.spacing(3),
        backgroundColor: '#D74C3D',
    },
    form: {
        marginTop: theme.spacing(1),

    },
    button: {
        margin: theme.spacing(3, 8, 4),
        fontSize: 10,
        textTransform: 'none',
        fontFamily: ['Arial',
                    'sans-serif',].join(','),

    },

}));


export default function Landing(){

    const classes = useStyles();

    return(
            <div className={classes.paper}>
                <Avatar className = {classes.avatar}/>

                <Typography component = "h1"  variant="h5"  className={classes.headline} >
                     Because you are the <br/>
                    skies in ecstatic moon
                 </Typography>
                 <form className={classes.form} noValidate>
                    <TextField
                     label = "Email Address"
                     margin = "normal"
                     variant= "outlined"
                     size = "small"
                    />
                     <br>
                     </br>
                    <Button className={classes.button}  variant ="outlined" size = "small">
                        Sign up
                    </Button>
                    <Typography component="h3" className={classes.headline}>
                    Already have an account?
                    </Typography>
                    <Button className ={classes.button} variant = "outlined" disableRipple size ="small">
                    Login
                    </Button>
                </form>
            </div>
    );
}

