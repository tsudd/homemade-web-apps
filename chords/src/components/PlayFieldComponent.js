import React, { useState } from "react";

function PlayField(props) {
  const [lenOfString, setLenOfString] = useState("20");

  const changeLenOfString = (event) => {
    let input = event.target.value;
    if (isNaN(input) && input !== "") {
      return;
    }
    if (parseInt(input) > 1000) {
      return;
    }
    setLenOfString(input);
  };

  const chordsString = (() => {
    if (props.chosenChords.length == 0) {
      return "";
    }
    if (lenOfString.length == 0) {
      return "";
    }
    let range = parseInt(lenOfString);
    let output = "";
    for (let i = 0; i < range && i < 1000; i++) {
      output +=
        " -- " +
        props.chosenChords[
          Math.floor(Math.random() * Math.floor(props.chosenChords.length))
        ].name;
    }
    return output;
  })();

  return (
    <div className="play-field">
      <input
        type="text"
        size="5"
        value={lenOfString}
        onChange={changeLenOfString}
      />
      <div>
        <h3>Chords sequence:</h3>
        <div>{chordsString}</div>
      </div>
    </div>
  );
}

export default PlayField;
