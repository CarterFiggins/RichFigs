import React, { useState } from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import { CgCloseO } from 'react-icons/cg';
import Select from 'react-select'

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

  // TODO: make the date out of the month and year
  const date = new Date();

  function daysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
  }

  const {isOpen, closeModal, monthDate, monthId, category, refetchMonth, userId, categoryList } = props
  const [createSpent] = useMutation(MAKE_SPENT);

  const [categoryValue, setCategoryValue] = useState({ value: category.id, label: category.name})
  const [dateValue, setDateValue] = useState({ value: date.getDate(), label: date.getDate()})


  const saveSpent = async (name, amount) => {
    await createSpent({ variables: {name, amount, userId, monthId, categoryId: category.id } });
    refetchMonth();
    closeModal();
  }

  const categoryChange = (selectedOption) => {
    setCategoryValue(selectedOption);
  }
  const dateChange = (selectedOption) => {
    setDateValue(selectedOption);
  }

  const options = _.map(categoryList, (category) => {
    return { value: category.id, label: category.name }
  })

  const dateOptions = _.map( _.range(1,daysInMonth(date) + 1), (day) => {
    return {value: day, label: day}
  })

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
              <Select 
                className="category-input"
                value={categoryValue}
                onChange={categoryChange}
                options={options}

              />
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
          <div>
              Date:
            </div>
            <div>
              <Select 
                className="category-input"
                value={dateValue}
                onChange={dateChange}
                options={dateOptions}
              />
            </div>
          </div>
        </div>
        <div className="popup-bottom flex-right">
          <button className="btn-save" onClick={() => saveSpent("name", 50)}>Save</button>
        </div>
        
      </div>
      
    </Modal>
  );

  
}