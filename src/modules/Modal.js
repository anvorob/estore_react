import React from 'react';
import ReactDOM from 'react-dom';

const Modal =({children,closeModal})=>{

    return ReactDOM.createPortal(
        <div className="modal-wrapper">
            <div className="modal-window">
                <div className="modal-close" onClick={closeModal}>x</div>
            {children}
            </div>
        </div>,
        document.getElementById("modal")
    )

}

export default Modal;

