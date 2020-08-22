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

  const {isOpen, closeModal, monthDate } = props

  // const [createSpent] = useMutation(MAKE_SPENT);

  // let test = await createSpent({ variables: {name, amount, userId, monthId, categoryId } })

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
        
      </div>
      
    </Modal>
  );

  
}