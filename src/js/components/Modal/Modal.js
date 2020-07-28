import React from "react";
import "./Modal.css";

export default function Modal(props) {

  let show = props.show ? "show" : "hide";

  return (
    <div className={"Modal " + show}>
      <img src={props.url} />
    </div>
  );
}
