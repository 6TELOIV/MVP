import React, { useState, useEffect } from "react";
import AdminDetail from "../components/AdminDetail"
import HoroscopeList from "../components/HoroscopeList"
import Search from "../components/Search"
import "./AdminPage.css";
import axios from 'axios'
import { Paper, AppBar, Typography, Toolbar } from '@material-ui/core'


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
  const setSelectedHoroscopeWrapper = (selected) => {
    setSelectedHoroscope(selected);
  }
  async function getHoroscopes() {
    let response = await axios.get("/api/admin");
    if (response.status === 200) {
      setHoroscopeList(response.data);
    }
  }

  useEffect(() => {
    getHoroscopes();
  }, [])
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
