import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import DeletePopup from './delete_popup';
import { ImBin } from 'react-icons/im';
import { FiEdit } from 'react-icons/fi';
import ExpensePopup from './expense_popup';
import { CgCloseO } from 'react-icons/cg';

const DELETE_SPENT = gql`
  mutation deleteSpent($spentId: ID!, $monthId: ID!, $categoryId: ID!) {
    deleteSpent(spentId: $spentId, monthId: $monthId, categoryId: $categoryId){
      deleted
    }
  }
`;

export default function ExpenseViewPopup(props) {

  const {isOpen, closeModal, spents, category, refetchMonth, monthId, userId, categoryList } = props

  const [deleteSpent] = useMutation(DELETE_SPENT);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [currentSpent, setCurrentSpent] = useState(null);

  // TODO:  Add X to  close view

  useEffect(() => {
    if(isOpen){
      refetchMonth();
    }
  }, [isOpen])


  const deleteItem = async () => {
    if(currentSpent) {
      await deleteSpent({ variables: {spentId: currentSpent.id, monthId, categoryId: category.id}});
      refetchMonth();
      setCurrentSpent(null);
      if(spents.length <= 1) {
        closeModal()
      }
    }
  }

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
        {category.name} Expenses
        <div className="popup-close" onClick={closeModal}><CgCloseO /></div>
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
                      <div className="icon-button-edit"
                        onClick={() => {
                          setCurrentSpent(spent);
                          setIsOpenEdit(true);
                        }}
                      >
                        <FiEdit />
                      </div>
                      <div
                        className="icon-button-delete"
                        onClick={() => {
                          setCurrentSpent(spent);
                          setIsDeleteOpen(true);
                       }}
                      >
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
      <DeletePopup
        isOpen={isDeleteOpen}
        closeModal={() => setIsDeleteOpen(false)}
        deleteItem={() => deleteItem()}
      />
      <ExpensePopup
        isOpen={isOpenEdit}
        closeModal={() => setIsOpenEdit(false)}
        refetchMonth={refetchMonth}
        isEdit={isOpenEdit}
        category={category}
        monthId={monthId}
        userId={userId}
        categoryList={categoryList}
        spent={currentSpent}
      />
    </div>
    </Modal>
  );

  
}