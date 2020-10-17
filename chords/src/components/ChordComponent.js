import React;

function Chord(props) {

  return (
    <li key={props.key} onClick={props.onClick}>
      <h4>{props.name}</h4>
    </li>
  )
}

export default Chord;
