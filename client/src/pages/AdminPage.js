import React, { useState, useEffect } from "react";
import AdminDetail from "../components/AdminDetail"
import HoroscopeList from "../components/HoroscopeList"
import Search from "../components/Search"
import "./AdminPage.css";
import axios from 'axios'
import { Paper, AppBar, Typography, Toolbar } from '@material-ui/core'
import { Redirect } from "react-router-dom";


export default function Admin() {
  const [filterHoroscope, setFilterHoroscope] = useState(
    {
      house: null,
      moon: null,
      sign: null,
      text: ''
    }
  );

  const setFilterHoroscopeWrapper = (filter) => {
    setFilterHoroscope(filter);
  }
  const [selectedHoroscope, setSelectedHoroscope] = useState();
  const [horoscopeList, setHoroscopeList] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const setSelectedHoroscopeWrapper = (selected) => {
    setSelectedHoroscope(selected);
  }
  async function getHoroscopes() {
    let response = await axios.get("/api/admin");
    if (response.status === 200) {
      if(!(response.data === "Not an administrator")){
        setHoroscopeList(response.data);
      }else{
        setRedirect(true);
      }
    }
  }

  useEffect(() => {
    getHoroscopes();
  }, [])

  if (redirect) {
    return (
      <Redirect to={{ pathname: "/UserDashboard"}} />
    );
  }else{

  return (
    <div className="adminRoot">
      <AppBar position="relative" className="header">
        <Toolbar>
          <div className="title">
            <Typography variant="h6" >
              Horoscopes Database Admin Access
            </Typography>
          </div>
          <Search setFilterHoroscope={setFilterHoroscopeWrapper} />
        </Toolbar>
      </AppBar>
      <Paper className="description" square elevation="0">
        <AdminDetail horoscopeView={selectedHoroscope} />
      </Paper>
      <Paper className="table" square elevation="0">
        <HoroscopeList horoscopeList={horoscopeList}
          filterHoroscope={filterHoroscope}
          setSelectedHoroscope={setSelectedHoroscopeWrapper}
        />
      </Paper>
    </div>
  );
}
}
