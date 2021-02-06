import React from 'react';

const NotificationBox =({children})=>{

    return (
            <div className="prompt-wrapper">
                <div className="prompt-window">
                {children}
                </div>
            </div>
        )

}

export default NotificationBox;

