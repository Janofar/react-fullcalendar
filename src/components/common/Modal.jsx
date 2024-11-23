import React from 'react';
import '../../styles/modal.css';
const EVENT_LIST_MODAL = 1;
const EVENT_DETAIL_MODAL = 2;

const Modal = ({
    isOpen,
    onClose,
    children,
    modalHeader,
    showEdgeCloseButton = true,
    modalType
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay " onClick={onClose}>
            <div
                className="modal-content"
                style={{
                    width: modalType === EVENT_LIST_MODAL ? '30%' : '50%',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {modalHeader && (
                    <div className="modal-header" style={{ backgroundColor: 'transparent' }}>
                        <h2 className='pl-2 font-semibold text-gray-700'>{modalHeader}</h2>
                        <button className="close-button  flex items-center justify-center mb-1 !bg-blue-500 text-white !rounded-full w-5 h-5" onClick={onClose}>
                            <span className="text-lg mb-1"> &times; </span>
                        </button>
                    </div>
                )}

                {showEdgeCloseButton && (
                    <div className="relative" style={{ backgroundColor: 'transparent' }}>
                        <button
                            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-blue-500 text-white rounded-full w-6 h-6"
                            onClick={onClose}
                        >
                            <span className="text-lg font-bold mb-1" style={{ lineHeight: '1' }}>&times;</span>
                        </button>
                    </div>
                )}

                <div className="modal-body p-0" style={{ padding: '0px' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
