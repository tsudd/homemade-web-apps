import React;
import Chord from "./ChordComponent";

function ChosenChordsList(props) {
  const chordsList = props.chords.map((chord) => {
    return (
      <Chord
        key={chord.id}
        name={chord.name}
        onClick={() => props.onClick(chord)}
      />
    );
  });

  return (
    <div>
      <h3>Chosen chords</h3>
      <ul>{chordsList}</ul>
    </div>
  )
}

export default ChosenChordsList;
