import React, { useState } from "react";
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
});

const HoroscopeList = props => {
  const classes = useStyles();

  const list = props.horoscopeList;

  //filter shit

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell>Sun</TableCell>
            <TableCell align="right">Moon</TableCell>
            <TableCell align="right">Ascendent</TableCell>
            <TableCell align="right">Horoscope</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map(row => (
            <TableRow key={list}>
              <TableCell component="th" scope="row">{row.sun}</TableCell>
              <TableCell align="right">{row.moon}</TableCell>
              <TableCell align="right">{row.ascendant}</TableCell>
              <TableCell align="right">{row.horoscope}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default HoroscopeList;
