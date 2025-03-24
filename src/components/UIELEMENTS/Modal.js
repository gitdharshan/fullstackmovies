import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";
import Backdrop from "./Backdrop";

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className || ""}`} style={props.style}>
      <header className={`modal_header ${props.headerClass || ""}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}
      >
        <div className={`modal_content ${props.contentClass || ""}`}>
          {props.children}
        </div>
        <footer className={`modal_footer ${props.footerClass || ""}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  const nodeRef = useRef(null); // Fixes findDOMNode error

  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef} // Use the ref instead of findDOMNode
      >
        <div ref={nodeRef}>
          <ModalOverlay {...props} />
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
