import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AdminDetail from "../components/AdminDetail"
import HoroscopeList from "../components/HoroscopeList"
import "./Landing.css";

const useStyles = makeStyles(theme => ({
  
}));

export default function Admin() {
  const classes = useStyles();
  const [filterHoroscope, setFilterHoroscope] = useState(
        {
          house: -1,
          moon: -1,
          sign: -1,
          text: 's'
        }
      );
    const [selectedHoroscope, setSelectedHoroscope] = useState([]);
    const [horoscopeList, setHoroscopeList] = useState([
        {
          house: 5,
          moon: 3,
          sign: 9,
          text: 'ipsum dolores'
        },
        {
          house: 2,
          moon: 1,
          sign: 6,
          text: 'ssdf'
        },
        {
          house: 7,
          moon: 7,
          sign: 6,
          text: 'ok bud'
        },
        {
          house: 1,
          moon: 6,
          sign: 4,
          text: 'sssss'
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
        <HoroscopeList horoscopeList={horoscopeList} 
                       filterHoroscope={filterHoroscope} 
                       setSelectedHoroscope={setSelectedHoroscope} 
        />
    </div>
  );
}
