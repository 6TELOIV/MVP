import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles({
  table: {
    width: 650,
    backgroundColor: 'white',
  },
  entry:{
     cursor: 'pointer'
  }
});

const HoroscopeList = props => {
  const classes = useStyles();

  const list = props.horoscopeList;
  var filteredList = [];
  console.log(props.filterHoroscope);

  var i;
  for (i = 0; i < props.horoscopeList.length; i++) {
    if(props.filterHoroscope.house!==null && props.filterHoroscope.house!==list[i].house){
      continue;
    }
    if(props.filterHoroscope.moon!==null && props.filterHoroscope.moon!==list[i].moon){
      continue;
    }
    if(props.filterHoroscope.sign!==null && props.filterHoroscope.sign!==list[i].sign){
      continue;
    }
    if(props.filterHoroscope.text!=='' && !(list[i].text.toLowerCase().startsWith(props.filterHoroscope.text.toLowerCase()))){
      continue;
    }
    filteredList.push(list[i])
  }

  //filter shit

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell>House</TableCell>
            <TableCell align="right">Moon</TableCell>
            <TableCell align="right">Sign</TableCell>
            <TableCell align="right">Text</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredList.map(row => (
            <TableRow className={classes.entry} key={list} onClick={()=>{props.setSelectedHoroscope(row);}}>
              <TableCell component="th" scope="row">{row.house}</TableCell>
              <TableCell align="right">{row.moon}</TableCell>
              <TableCell align="right">{row.sign}</TableCell>
              <TableCell align="right">{row.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default HoroscopeList;
