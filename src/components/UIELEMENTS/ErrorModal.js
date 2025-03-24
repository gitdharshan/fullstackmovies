import React from 'react';
import Modal from './Modal';
import Button from '../../shared/FormElements/Button';

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear ? props.onClear : () => {}} // Prevent error
      header="An Error Occurred"
      //show={props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error ? props.error : "Something went wrong!"}</p>
    </Modal>
  );
};

export default ErrorModal;
