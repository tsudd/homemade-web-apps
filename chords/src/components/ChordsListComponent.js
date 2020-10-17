import React from "react";
import Chord from "./ChordComponent";

function ChordList(props) {
  const chordsList = props.chords.map((chord) => {
    return (
      <li key={chord.id}>
        <Chord name={chord.name} onClick={() => props.onClick(chord)} />
      </li>
    );
  });

  return (
    <div>
      <h3>Chords list. Just choose one</h3>
      <ul>{chordsList}</ul>
    </div>
  );
}

export default ChordList;
