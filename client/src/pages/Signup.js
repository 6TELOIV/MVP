import React, {useState} from "react";
import './Signup.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(3),
      backgroundColor: '#D74C3D',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(5, 0, 3),
      backgroundColor: '#396384'
    },
    ok:{
        backgroundColor: 'white',
        borderRadius: '5%'
    }
  }));

function Signup(props){
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(new Date());    

    return(
        <Container component="main" maxWidth="xs" className={classes.ok}>
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}/>
            <Typography component="h1" variant="h5">
              We just need a few more things
            </Typography>
            <form className={classes.form} validate onSubmit={console.log('submit')}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"                  
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                />
                </Grid>
                
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
                </Grid>

                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      disableFuture
                      openTo="year"
                      format="dd/MM/yyyy"
                      label="Date of Birth"
                      views={["year", "month", "date"]}
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                  
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker autoOk label="Time of Birth" value={selectedDate} onChange={handleDateChange} />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="place"
                      label="Birthplace"
                      name="place"
                  />
                </Grid>

            </Grid>
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
            </Button>

            </form>
        </div>
    </Container>
    );
}

export default Signup;