import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import { CgCloseO } from 'react-icons/cg';
import Select from 'react-select'

const MAKE_SPENT = gql`
  mutation makeSpent($name: String!, $amount: Float!, $date: Int! $userId: ID!, $monthId: ID!, $categoryId: ID!, $editing: Boolean!, $spentId: ID) {
    createSpent(name: $name, amount: $amount, date: $date, userId: $userId, monthId: $monthId, categoryId: $categoryId, editing: $editing, spentId: $spentId) {
      success
    }
  }
`;

export default function ExpensePopup(props) {

  // TODO: make the date out of the month and year
  const {isOpen, closeModal, monthId, category, refetchMonth, userId, categoryList, isEdit, spent, currentDate } = props;

  function daysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
  }

  const [createSpent] = useMutation(MAKE_SPENT);

  const [categoryValue, setCategoryValue] = useState({ value: category.id, label: category.name});
  const [dateValue, setDateValue] = useState({ value: currentDate.getDate(), label: currentDate.getDate()});
  const [amountValue, setAmountValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  useEffect(
    () => {
      if(isEdit) {
        setDateValue({ value: parseInt(spent.date.split('-')[2]), label: parseInt(spent.date.split('-')[2]) })
        setAmountValue(spent.amount)
        setNameValue(spent.name)
      }
    },
    [isEdit]
  );

  const saveSpent = async () => {

    if (amountValue && nameValue) {
      await createSpent({ 
        variables: {
          name: nameValue,
          amount: parseFloat(amountValue),
          date: dateValue.label,
          userId,
          monthId,
          categoryId: categoryValue.value,
          editing: isEdit,
          spentId: isEdit ? spent.id : null
        }

      })
      refetchMonth();
      setNameValue('');
      setAmountValue('');
      closeModal();
    }
  }

  const categoryChange = (selectedOption) => {
    setCategoryValue(selectedOption);
  }
  const dateChange = (selectedOption) => {
    setDateValue(selectedOption);
  }
  const amountChange = (event) => {
    setAmountValue(event.target.value);
  }
  const nameChange = (event) => {
    setNameValue(event.target.value);
  }

  var options = _.map(categoryList, (category) => {
    if(!category.isFixed){
      return { value: category.id, label: category.name }
    }
  })
  // clears out undefined left by fixed categories
  options = options.filter( category => category != null)

  const dateOptions = _.map( _.range(1,daysInMonth(currentDate) + 1), (day) => {
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
          <div className="popup-title">{isEdit ? 'Edit' : 'Add'} Expense</div>
          <div className="popup-close" onClick={closeModal}><CgCloseO /></div>
        </div>
        <div className="popup-body">
          <div className="input-container">
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
          <div className="input-container">
            <div>
              Name: 
            </div>
            <input className="category-input" type="text" value={nameValue} onChange={nameChange} />
          </div>
          <div className="input-container">
            <div>
              Amount: 
            </div>
            <input className="category-input" type="number" value={amountValue} onChange={amountChange} />
          </div>
          <div className="input-container">
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
          <button className="btn-save" onClick={saveSpent}>{ isEdit ? 'Edit' : 'Save'}</button>
        </div>
        
      </div>
      
    </Modal>
  );

  
}