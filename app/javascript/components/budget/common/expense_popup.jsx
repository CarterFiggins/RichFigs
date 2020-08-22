import React from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import { CgCloseO } from 'react-icons/cg';

const MAKE_SPENT = gql`
  mutation makeSpent($name: String!, $amount: Float!, $userId: ID!, $monthId: ID!, $categoryId: ID!) {
    createSpent(name: $name, amount: $amount, userId: $userId, monthId: $monthId, categoryId: $categoryId) {
      spent {
        id
      }
    }
  }
`;

export default function ExpensePopup(props) {

  const {isOpen, closeModal, monthDate, monthId, category, refetchMonth } = props

  const [createSpent] = useMutation(MAKE_SPENT);

  const saveSpent = async (name, amount) => {
    await createSpent({ variables: {name, amount, userId: 1, monthId, categoryId: category.id } });
    refetchMonth();
    closeModal();
  }

  return(
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Example Modal"
    overlayClassName="popup_background"
    className="popup"
    appElement={document.getElementById('app')}

    >
      <div>
        <div className="popup-header">
          <div className="popup-title">Add Expense</div>
          <div className="popup-close" onClick={closeModal}><CgCloseO /></div>
        </div>
        <div className="popup-body">
          <div>Category:  </div>
          <div>Name: <input /></div>
          <div>Amount: <input /></div>
          <div>Date: </div>
        </div>
        <div>
          <button onClick={() => saveSpent("name", 50)}>Save</button>
        </div>
        
      </div>
      
    </Modal>
  );

  
}