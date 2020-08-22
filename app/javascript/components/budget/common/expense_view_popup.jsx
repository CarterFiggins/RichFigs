import React from 'react';
import _ from 'lodash';
import Modal from 'react-modal';
import { ImBin } from 'react-icons/im'
import { FiEdit } from 'react-icons/fi'


export default function ExpenseViewPopup(props) {

  const {isOpen, closeModal, spents, category } = props

  // TODO: make Delete and Edit for spent

  return(
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Example Modal"
    overlayClassName="modal_background"
    className="modal"
    appElement={document.getElementById('app')}
    >
     <div>
      <div className="expenses-view-header">
        {category.name}'s Expenses
      </div>
      <table className="expenses-table">
        <thead>
          <tr className="table-head">
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {_.map(spents, (spent) => {
            return (
              <tr key={spent.id}> 
                <td>
                  <div className="table-body-name">
                    <div className="table-name">
                      {spent.name}
                    </div>
                    <div className="flex">
                      <div className="icon-button-edit">
                        <FiEdit />
                      </div>
                      <div className="icon-button-delete">
                        <ImBin />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{spent.amount}</td>
                <td>{spent.date}</td>
                <td>{spent.user.userName}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </Modal>
  );

  
}