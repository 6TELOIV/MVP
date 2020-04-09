import React from "react";
import { Typography, Toolbar } from "@material-ui/core";
import "./AdminDetail.css";

const UserDetails = (props) => {
  const hs = props.hs;
  return (
    <div>
      <Toolbar>
        <Typography variant="h6">Horoscope Details</Typography>
      </Toolbar>
      <div className="detailsInner">
        <Typography variant="subtitle1" component="span">
          Horoscope:{" "}
        </Typography>
        <Typography variant="body2" component="p">
          {hs.summary}
        </Typography>
        <br />
        <br />
        <Typography variant="subtitle1" component="span">
          quote author:{" "}
        </Typography>
        <Typography variant="body2" component="span">
          {hs.quoteAuthor}
        </Typography>
        <br />
        <Typography variant="subtitle1" component="span">
          quote source:{" "}
        </Typography>
        <Typography variant="body2" component="span">
          {hs.quoteSrc}
        </Typography>
        <br />
        <Typography variant="subtitle1" component="span">
          quote:{" "}
        </Typography>
        <Typography variant="body2" component="p">
          {hs.quote}
        </Typography>
        <br />
        <br />
        <Typography variant="subtitle1" component="span">
          best activities:{" "}
        </Typography>
        <Typography variant="body2" component="p">
          {hs.bestActivities}
        </Typography>
        <br />
        <br />
        <Typography variant="subtitle1" component="span">
          Moon themes:{" "}
        </Typography>
        <Typography variant="body2" component="span">
          {hs.moonThemes}
        </Typography>
        <br />
        <Typography variant="subtitle1" component="span">
          Sign themes:{" "}
        </Typography>
        <Typography variant="body2" component="span">
          {hs.signThemes}
        </Typography>
        <br />
        <Typography variant="subtitle1" component="span">
          House themes:{" "}
        </Typography>
        <Typography variant="body2" component="span">
          {hs.houseThemes}
        </Typography>
      </div>
    </div>
  );
};

export default UserDetails;
