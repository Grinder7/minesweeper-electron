import React from "react";

const Popup = (props) => {
  return (
    <dialog id={props.popupId} className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">{props.popupTitle}</h3>
        <div className="pt-4">{props.children}</div>
        <div className="modal-action">
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
};

export default Popup;
