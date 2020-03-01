import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [isMousedOver, setMouseOver] = useState(false);

    //Detects if mouse is over Login button
    function handleMouseOver() {
        setMouseOver(true);
    }

    //Detects if mouse is off of Login button
    function handleMouseOut() {
        setMouseOver(false);
    }

    //Send user to their user settings page (incomplete)
    function handleClick() {}

  return (
    <div className="container">
      <h1> Login </h1>
      <input type="text" placeholder="Username" />
      <button
        style={{
          backgroundColor: isMousedOver ? "grey" : "lightblue"
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
