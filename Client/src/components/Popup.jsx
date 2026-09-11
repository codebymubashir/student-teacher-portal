import React from 'react';
import { createPortal } from 'react-dom';

const Popup = ({ display = 'center', isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div
            onClick={onClose}
            className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-2xl shadow-xl p-6 w-80'
            >
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Popup;