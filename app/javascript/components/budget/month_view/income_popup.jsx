import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import Select from 'react-select'
import { CgCloseO } from 'react-icons/cg';


const MAKE_INCOME = gql`
  mutation makeIncome(
    $name: String!,
    $amount: Float!,
    $userId: ID!,
    $monthId: ID!,
    $repeated: Boolean,
    $date: Int!,
    $incomeId: ID,
  ){
    createIncome(
      name: $name,
      amount: $amount,
      userId: $userId,
      monthId: $monthId,
      repeated: $repeated,
      date: $date,
      incomeId: $incomeId,
    ){
      success
    }
  }
`;

export default function IncomePopup(props) {

  const {isOpen, closeModal, monthId, userId, refetchMonth, income, currentDate} = props

  function daysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
  }


  const [amountValue, setAmountValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [dateValue, setDateValue] = useState({ value: currentDate.getDate(), label: currentDate.getDate()});
  const [repeated, setRepeated] = useState(false);

  const [createIncome] = useMutation(MAKE_INCOME);

  

  useEffect(
    () => {
      if(income) {
       // set up popup with income values
       setAmountValue(income.amount);
       setNameValue(income.name);
       setDateValue({ value: parseInt(income.date.split('-')[2]), label: parseInt(income.date.split('-')[2]) })
      }
    },
    [income]
  );

  const amountChange = (event) => {
    if(event.target.value) {
      setAmountValue(parseFloat(event.target.value));
    }
    else{
      setAmountValue('');
    }
  }
  const nameChange = (event) => {
    setNameValue(event.target.value);
  }
  const repeatedChange = (event => {
    setRepeated(event.target.checked)
  })
  const dateChange = (selectedOption) => {
    setDateValue(selectedOption);
  }


  const saveIncome = async () => {
    if (amountValue && nameValue){
      await createIncome({
        variables: {
          name: nameValue,
          amount: amountValue,
          userId,
          monthId,
          repeated,
          date: dateValue.label,
          incomeId: income ? income.id : null,
        }
      });
      if(!income) {
        setAmountValue('');
        setNameValue('');
      }
      refetchMonth();
      closeModal();
    }
  }

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
          <div className="popup-title">
            {income ? 'Edit' : 'Add'} Income
          </div>
          <div className="popup-close" onClick={closeModal}><CgCloseO /></div>
        </div>
        <div className="popup-body">
          <div className="input-container">
            <div>Name: </div>
            <input className="category-input" type="text" value={nameValue} onChange={nameChange} />
          </div>
          <div className="input-container">
            <div>Income: </div>
            <input className="category-input" type="number" value={amountValue} onChange={amountChange} />
          </div>
          <div className="input-container-left">
            <div>Repeat: </div>
            <div className="checkbox-popup-repeat">
              <input className="category-checkbox" type="checkbox" checked={repeated} onChange={repeatedChange} />
            </div>
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
          <button className="btn-save" onClick={saveIncome}>Save</button>
        </div>
      </div>
      
    </Modal>
  );

  
}