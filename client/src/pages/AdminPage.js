import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AdminDetail from "../components/AdminDetail"
import HoroscopeList from "../components/HoroscopeList"
import Search from "../components/Search"
import "./Landing.css";


export default function Admin() {
  const [filterHoroscope, setFilterHoroscope] = useState(
    {
      house: null,
      moon: null,
      sign: null,
      text: ''
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
          house: 7,
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
    <div>
      <Search
      setFilterHoroscope = {setFilterHoroscope}
      />
    </div>
    <div>
        <AdminDetail horoscopeView={selectedHoroscope}/> 
    </div>
    <div>
      <HoroscopeList horoscopeList={horoscopeList} 
                       filterHoroscope={filterHoroscope} 
                       setSelectedHoroscope={setSelectedHoroscope} 
        />
    </div>
    </div>  
    );
}
