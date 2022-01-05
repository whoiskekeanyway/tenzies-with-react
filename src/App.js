import "./App.css";
import React from "react";
import LandingPage from "./components/LandingPage";
import GameButtons from "./components/Gamebutton";
// nanoid is used by tenzies to generate a random string
import { nanoid } from "nanoid";
// Confetti is a component that is used to show the confetti animation when the user wins
import Confetti from "react-confetti";

function App() {
  const [dieArray, setDieArray] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [counter, setCounter] = React.useState(0);




  // The every() method tests whether all elements in the array pass the test implemented by the provided function.
  //  It returns a Boolean value

  React.useEffect(() => {
    // check if all dice are held or not
    const allHeld = dieArray.every((die) => die.isHeld);
    // pick a random value from the dieArray
    // store the value of the first die in a variable
    const firstValue = dieArray[0].value;
    // check if every() dice value are the same value as the firstValue
    const allSameValue = dieArray.every((die) => die.value === firstValue);
    // if allHeld is true and allSameValue is true, then setTenzies to true
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dieArray, counter]);

  // const dieObject = { ...[dieArray] };
  // console.log(dieObject);

  // Function to create new dice between 1 and 6
  // The function returns an object with a unique id and a random value between 1 and 6
  // The function return if the dice is held or not
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      // nanoid is a random string generator used as id number generator for each die
      id: nanoid(),
    };
  }

  // new array to hold my numbers
  // loop 10 times
  // push a random number between 1-6 to my array with the generateNewDie function
  // return array
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // Function to roll dice over and over again
  function rollDice() {
    setCounter((prevCounter) => prevCounter + 1);
    // if tenzies is false, roll again
    if (!tenzies) {
      setDieArray((oldDice) =>
        oldDice.map((die) => {
          // if the die is held, then the value stays the same,
          // if the die is not held, then the value is changed to a random number between 1 and 6
          // with the generateNewDie function
          // : and ? are ternary operators, they are used to return a value based on a condition
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      // else
      // if tenzie is true, set it to false
      // set the dieArray to allNewDice
      setTenzies(false);
      setDieArray(allNewDice());
      setCounter(0);
    }
  }

  // Functions to hold and unhold dice with onClick
  function holdDice(id) {
    setDieArray((oldDice) =>
      oldDice.map((die) => {
        // if the die id is the same as the die id passed in the holdDice
        // === strict equality is used to compare the values of the two variables.

        return die.id === id
          ? // function then update the object with the isHeld property with opposite
            { ...die, isHeld: !die.isHeld }
          : die;
      })
    );
  }

  const diceElements = dieArray.map((die) => (
    <GameButtons
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      // Pass in the function as a prop with id as the argument
      holdDice={() => holdDice(die.id)}
    />
  ));

  const BadgeText = "You won with ";
  const rolls = " rolls!";
  // const highScoreText = "Highest Score: ";
  const highScoreText3 = "You are currently at ";
  const text = BadgeText + counter + rolls;
  const currentRolls = highScoreText3 + counter + rolls;
  // const highScoreText2 =
  //   highScoreText + localStorage.getItem("highScore") + rolls;

  return (
    <main>
      {/* Render Confetti component if `tenzies` is true*/}
      {tenzies && <Confetti />}

      <LandingPage />

      <h1 className="badgetext"> {tenzies && text}</h1>
      {<div className='gamebuttons'>{diceElements}</div>}
      <h1 className="currentrolls">{!tenzies && currentRolls}</h1>
      <button onClick={rollDice} className='roll-button'>
        {/* if tenzies is true then change the button words to newgame otherwise use Roll  */}
        {tenzies ? "New Game! " : "Roll"}
      </button>
    </main>
  );
}

export default App;
