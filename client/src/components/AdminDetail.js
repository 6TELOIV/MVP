import React from "react";

import { Link } from "react-router-dom"; //Shaun added
import Button from "@material-ui/core/Button";
import { Typography, Toolbar } from "@material-ui/core";
import "./AdminDetail.css";

const AdminDetail = props => {
  const hs = props.horoscopeView; //Changed some stuff here to better adapt to the current horoscope model - Shaun
  return (
    <React.Fragment>
      <Toolbar>
        <div className="title">
          <Typography variant="h6" >
            Horoscope Details
          </Typography>
        </div>
        <Link
          to={{
            pathname: "AdminEdit",
            selHoro: hs
          }}
          style={{ textDecoration: "none" }}
          onClick={(e) => {
            if (!hs) {
              e.preventDefault();
            }
          }}
        >
          <Button variant="outlined" size="small" disabled={!hs}>
            Edit
          </Button>
        </Link>
      </Toolbar>
      <div className="detailsInner">
        {
          hs ?
            <React.Fragment>
              <Typography variant="subtitle1" component="span">sign: </Typography><Typography variant="body2" component="span">{hs.sign}</Typography>
              <br />
              <Typography variant="subtitle1" component="span">house: </Typography><Typography variant="body2" component="span">{hs.house}</Typography>
              <br />
              <Typography variant="subtitle1" component="span">moon: </Typography><Typography variant="body2" component="span">{hs.moonPhase}</Typography>
              <br />
              <br />
              <Typography variant="subtitle1" component="span">summary: </Typography><Typography variant="body2" component="p">{hs.summary}</Typography>
              <br />
              <br />
              <Typography variant="subtitle1" component="span">quote author: </Typography><Typography variant="body2" component="span">{hs.quoteAuthor}</Typography>
              <br />
              <Typography variant="subtitle1" component="span">quote source: </Typography><Typography variant="body2" component="span">{hs.quoteSrc}</Typography>
              <br />
              <Typography variant="subtitle1" component="span">quote: </Typography><Typography variant="body2" component="p">{hs.quote}</Typography>
              <br />
              <br />
              <Typography variant="subtitle1" component="span">best activities: </Typography><Typography variant="body2" component="p">{hs.bestActivities}</Typography>
              <br />
              <br />
              <Typography variant="subtitle1" component="span">moon themes: </Typography><Typography variant="body2" component="span">{hs.moonThemes}</Typography>
              <br />
              <Typography variant="subtitle1" component="span">sign themes: </Typography><Typography variant="body2" component="span">{hs.signThemes}</Typography>
              <br />
              <Typography variant="subtitle1" component="span">house themes: </Typography><Typography variant="body2" component="span">{hs.houseThemes}</Typography>
            </React.Fragment> :
            <Typography variant="body2" component="span">Click an entry to view details</Typography>
        }
      </div>
    </React.Fragment>
  );
};

export default AdminDetail;
