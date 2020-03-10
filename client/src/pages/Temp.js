import React from "react";

const Temp = props => {
  console.log(props);
  return (
    <div style={{ backgroundColor: "white" }}>
      <pre>{JSON.stringify(props.location.state.data, null, 2)}</pre>
    </div>
  );
};

export default Temp;
