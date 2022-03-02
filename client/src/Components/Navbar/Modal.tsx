import './Modal.css';
import React from 'react';

function Form(props:any) {
  return (
    <div className="container">
      <div
        className="form-background"
        onClick={() => console.log('close')}
      ></div>

      <div className="form">{props.children}</div>
    </div>
  )
}

export default Form;