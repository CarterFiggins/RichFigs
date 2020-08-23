import React from 'react';
import _ from 'lodash';
import Modal from 'react-modal';



export default function DeletePopup(props) {

  const {isOpen, closeModal, deleteItem} = props


  return(
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Example Modal"
    overlayClassName="popup_background"
    className="small_popup"
    appElement={document.getElementById('app')}
    >
     <div>
        <div className="title">
          Are you sure?
        </div>
        <div className="flex center">
          <div className="btn-container">
            <button className="btn-delete" onClick={() => {deleteItem(); closeModal();}}>
              Delete
            </button>
          </div>
          <div className="btn-container">
            <button className="btn-cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
     </div>
    </Modal>
  );

  
}