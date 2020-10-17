import React from "react";

import CHORDS from "../shared/chords";
import ChosenChordsList from "./ChosenChordsListComponent";
import { useState } from "react";

function ChordMainComponent(props) {
  const [chosenChords, setChosenChords] = useState([]);

  const handleChordChoosingClick = (chord) => {
    if (chosenChords.includes(chord)) {
      return;
    }
    const chosenChordsArray = chosenChords.slice();
    chosenChordsArray.push(chord);
    setChosenChords(chosenChordsArray);
  };

  const handleChosenChordClick = (chord) => {
    const chosenChordsArray = [];
    for (let i = 0; i < chosenChords.length; i++) {
      if (chosenChords[i].id != chord.id) {
        chosenChordsArray.push(chosenChords[i]);
      }
    }
    setChosenChords(chosenChordsArray);
  };

  return (
    <div>
      <h3>Main Component</h3>
      <ChosenChordsList
        onClick={handleChosenChordClick}
        chords={chosenChords}
      />
    </div>
  );
}

export default ChordMainComponent;
