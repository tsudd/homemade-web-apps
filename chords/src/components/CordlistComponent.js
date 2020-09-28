import React from "react";

function ChordList(props) {
  const items = props.chords.map((chord) => {
    return (
      <li className="chord" key={chord.id}>
        {chord.name}
      </li>
    );
  });

  return (
    <div className="chord-list">
      Chords to play:
      <ul>{items}</ul>
    </div>
  );
}

export default ChordList;
