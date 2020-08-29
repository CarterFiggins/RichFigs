import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import DeletePopup from '../common/delete_popup';
import { ImBin } from 'react-icons/im';
import { FiEdit } from 'react-icons/fi';
import IncomePopup from './income_popup';
import { CgCloseO } from 'react-icons/cg';

const DELETE_INCOME = gql`
  mutation deleteIncome($incomeId: ID!, $monthId: ID!) {
    deleteIncome(incomeId: $incomeId, monthId: $monthId){
      deleted
    }
  }
`;

export default function ExpenseViewPopup(props) {

  const {isOpen, closeModal, incomes, refetchMonth, monthId, userId } = props

  const [deleteIncome] = useMutation(DELETE_INCOME);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [currentIncome, setCurrentIncome] = useState(null);

  useEffect(() => {
    if(isOpen){
      refetchMonth();
    }
  }, [isOpen])


  const deleteItem = async () => {
    if(currentIncome) {
      await deleteIncome({ variables: {incomeId: currentIncome.id, monthId}});
      refetchMonth();
      setCurrentIncome(null);
      if (incomes.length <= 1) {
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
        Month's Income
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
          {_.map(incomes, (income) => {
            return (
              <tr key={income.id}> 
                <td>
                  <div className="table-body-name">
                    <div className="table-name">
                      {income.name}
                    </div>
                    <div className="flex">
                      <div className="icon-button-edit"
                        onClick={() => {
                          setCurrentIncome(income);
                          setIsOpenEdit(true);
                        }}
                      >
                        <FiEdit />
                      </div>
                      <div
                        className="icon-button-delete"
                        onClick={() => {
                          setCurrentIncome(income);
                          setIsDeleteOpen(true);
                       }}
                      >
                        <ImBin />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{income.amount}</td>
                <td>{income.date}</td>
                <td>{income.user.userName}</td>
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
      <IncomePopup
        isOpen={isOpenEdit}
        closeModal={() => setIsOpenEdit(false)}
        refetchMonth={refetchMonth}
        monthId={monthId}
        userId={userId}
        income={currentIncome}
      />
    </div>
    </Modal>
  );

  
}