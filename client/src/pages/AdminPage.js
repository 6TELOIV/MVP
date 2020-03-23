import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AdminDetail from "../Components/AdminDetail"
import Search from "../Components/Search.js"
import "./Landing.css";

const useStyles = makeStyles(theme => ({
  
}));

export default function Admin() {
  const classes = useStyles();
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
  const [FilterText, setFilterText] = useState('');

//   async function getHoroscopes() {
//     let response = await axios.post("/api/horoscopeList");
//     if (response.status === 200) {
//         setHoroscopeList(response.data);
//     }
//   }

  const filterUpdate = (value) => {

    setFilterText(value);

  };

  return (
    <div>
    <div>
    <Search
    filterUpdate = {filterUpdate}
    
    />
     </div>
    <div>
        <AdminDetail horoscopeView={horoscopeList[0]}/>
    </div>
    </div>  
    );
}
