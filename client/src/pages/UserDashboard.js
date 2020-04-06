import React, {useEffect, useState} from "react"
import "./Site.css";
import useStyles from "../assets/Style.js"
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Card } from "@material-ui/core";
import axios from 'axios';
import { Redirect } from "react-router-dom";

import { numberToSign } from '../helpers/helpers.js'

const UserDashboard = props =>{
    useEffect(()=>{
        getInfo();
    },[]);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [sign, setSign] = useState(1);
    const [house, setHouse] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const classes = useStyles();
    async function getInfo(){
        let response = await axios.get("/api/getUserInfo");
        if(!response.data) setRedirect(true);
        if(response.status === 200){
            setName(response.data.name);
            setUsername(response.data.username);
            setSign(response.data.sign);
            setHouse(response.data.house);
        }
    }
    async function logout(e){
        e.preventDefault();
        await axios.delete("/api/signout");
        setRedirect(true);
    };
    if(redirect){return(<Redirect to={ {pathname: "/Login"}} />);}
    return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card className={classes.paper}>
        <Avatar className={classes.avatar}/>
        <Typography component="h1" variant="h5" align="center">
            Profile Information
        </Typography>
        <br></br>
        <Grid container spacing={2}>
            
            <Grid item xs={12}>
                <Typography component="h3" align="center">
                    Name: {name}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography component="h3" align="center">
                    Username: {username}
                </Typography>
            </Grid>
                
            <Grid item xs={12}>
                <Typography component="h3" align="center">
                    Sign: {numberToSign(sign)}
                </Typography>
            </Grid>
                
            <Grid item xs={12}>
                <Typography component="h3" align="center">
                    House: {numberToSign(house)}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={logout}
                    >
                    Logout
                </Button>
            </Grid>
            
        </Grid>

        </Card>
    </Container>
  );
};
export default UserDashboard;