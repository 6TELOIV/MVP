import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AdminDetail from "../components/AdminDetail"
import HoroscopeList from "../components/HoroscopeList"
import "./Landing.css";

const useStyles = makeStyles(theme => ({
  
}));

export default function Admin() {
  const classes = useStyles();
    const [filterText, setFilterText] = useState([]);
    const [selectedHoroscope, setSelectedHoroscope] = useState(0);
    const [horoscopeList, setHoroscopeList] = useState([
        {
          sun: 5,
          moon: 3,
          ascendant: 9,
          horoscope: 'ipsum dolores'
        },
        {
          sun: 2,
          moon: 1,
          ascendant: 1234,
          horoscope: 'john cena'
        },
        {
          sun: 123,
          moon: 33,
          ascendant: 4444,
          horoscope: 'Drury Inn & Suites Gainesville'
        },
        {
          sun: 2,
          moon: 3,
          ascendant: 4,
          horoscope: 'holy mackerl'
        }
      ]);
//   async function getHoroscopes() {
//     let response = await axios.post("/api/horoscopeList");
//     if (response.status === 200) {
//         setHoroscopeList(response.data);
//     }
//   }

  return (
    <div>
        <AdminDetail horoscopeView={horoscopeList[0]}/>
        <HoroscopeList horoscopeList={horoscopeList} filterText={filterText} selectedHoroscope={selectedHoroscope} />
    </div>
  );
}
