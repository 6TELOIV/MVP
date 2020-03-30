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
    width: "100%",
    maxHeight: "100%",
    backgroundColor: 'white',
  },
  entry:{
     cursor: 'pointer'
  }
});

const HoroscopeList = React.memo((props) => {

  const classes = useStyles();

  return (
    <TableContainer className={classes.table}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Sign</TableCell>
            <TableCell align="right">House</TableCell>
            <TableCell align="right">Moon</TableCell>
            <TableCell align="right">Text</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.horoscopeList.map((row, i) => {
            let housematch = !props.filterHoroscope.house || props.filterHoroscope.house==row.house;
            let signmatch = !props.filterHoroscope.sign || props.filterHoroscope.sign==row.sign;
            let moonmatch = !props.filterHoroscope.moon || props.filterHoroscope.moon==row.moonPhase;
            let textmatch = !props.filterHoroscope.text || (row.summary.toLowerCase().indexOf(props.filterHoroscope.text.toLowerCase()) >= 0);
            if (housematch && signmatch && moonmatch && textmatch) {
              return (
                <TableRow className={classes.entry} key={i} onClick={()=>{props.setSelectedHoroscope(row);}}>
                  <TableCell component="th" scope="row">{row.sign}</TableCell>
                  <TableCell align="right">{row.house}</TableCell>
                  <TableCell align="right">{row.moonPhase}</TableCell>
                  <TableCell align="right">{row.summary}</TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>

      </Table>
    </TableContainer>
  );
}, (prevProps, nextProps) => {
  return prevProps.horoscopeList.length === nextProps.horoscopeList.length && prevProps.filterHoroscope ===nextProps.filterHoroscope;
});

export default HoroscopeList;
