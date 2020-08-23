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

  const {isOpen, closeModal, monthDate, monthId, category, refetchMonth, userId } = props

  const [createSpent] = useMutation(MAKE_SPENT);

  const saveSpent = async (name, amount) => {
    await createSpent({ variables: {name, amount, userId, monthId, categoryId: category.id } });
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
          <div className="category-input-container">
            <div>
              Category:
            </div>
            <div>
            <select name="cars" id="cars" className="category-input">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            </div>
          </div>
          <div className="category-input-container">
            <div>
              Name: 
            </div>
            <input className="category-input" />
          </div>
          <div className="category-input-container">
            <div>
              Amount: 
            </div>
            <input className="category-input" />
          </div>
          <div className="category-input-container">
            Date: 
          </div>
        </div>
        <div className="popup-bottom flex-right">
          <button className="btn-save" onClick={() => saveSpent("name", 50)}>Save</button>
        </div>
        
      </div>
      
    </Modal>
  );

  
}