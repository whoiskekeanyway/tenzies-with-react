import React from "react";

export default function GameButton(props) {

  const styles = {
    // if props.isHeld is true, then the background color is set to #59E391
    // otherwise the background color is set to white
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className='die-face'
      style={styles}
      // function passed as a prop to GameButton component 
      onClick={props.holdDice}
    >
      <h2 className='die-num'>{props.value}</h2>
    </div>
  );
}
