import React, { useState } from 'react';
import { makeStyles, fade, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

//Helper to get and remove X=xxxxx substring value
//Returns [ value, newString ] value = undefined if not found
const getParam = (str, paramIdentifyer) => {
  let paramStr = str.match(new RegExp("\\s*" + paramIdentifyer + "=\\d*\\s*", ''));
  if (!paramStr) {
    return [undefined, str];
  }
  paramStr = paramStr[0];
  let param = paramStr.match(new RegExp("=\\d*", ''));
  console.log(param);
  if (param) {
    param = parseInt(param[0].substring(1));
  }
  str = str.replace(paramStr, '');
  return [param, str];
}

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Search = (props) => {

  const classes = useStyles();

  //State Variables for different fields
  const [house, setHouse] = useState();
  const [sign, setSign] = useState();
  const [text, setText] = useState();
  const [moon, setMoon] = useState();


  //Submit function that allows you to pass filtered fields from this component into filterUpdate function    
  const handleSubmit = () => {

    props.setFilterHoroscope({
      house: house,
      sign: sign,
      moon: moon,
      text: text,
    });
  }
  //Filter function that filters the different fields and then sets the state variables     
  const filter = (event) => {
    let value = event.target.value;
    let houseParam;
    let signParam;
    let moonParam;
    //House field
    [houseParam, value] = getParam(value, "h");
    houseParam = parseInt(houseParam);

    //Sign field
    [signParam, value] = getParam(value, "s");
    signParam = parseInt(signParam);

    //Moon field
    [moonParam, value] = getParam(value, "m");
    moonParam = parseInt(moonParam);

    console.log(houseParam,signParam,moonParam,value)
    //Set States
    setHouse(houseParam);
    setSign(signParam);
    setMoon(moonParam);
    setText(value ? value : undefined);
  }


  return (
    <form onSubmit={e => { e.preventDefault(); handleSubmit() }}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={filter}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </form>
  );

};

export default Search;
