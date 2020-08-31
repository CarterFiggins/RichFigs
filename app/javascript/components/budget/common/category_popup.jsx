import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import Select from 'react-select'
import { CgCloseO } from 'react-icons/cg';


const MAKE_CATEGORY = gql`
  mutation makeCategory($name: String!, $amount: Float!, $isFixed: Boolean!, $monthId: ID!, $repeated: Boolean, $isEdit: Boolean, $categoryId: ID, $date: Int) {
    createCategory(name: $name, amount: $amount, isFixed: $isFixed, monthId: $monthId, repeated: $repeated, isEdit: $isEdit, categoryId: $categoryId, date: $date) {
      category {
        id
      }
    }
  }
`;

export default function CategoryPopup(props) {

  const {isOpen, closeModal, monthId, refetchMonth, isEdit, category, currentDate} = props

  const [amountValue, setAmountValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [fixed, setFixed] = useState(false);
  const [repeated, setRepeated] = useState(false);
  const [dateValue, setDateValue] = useState({ value: currentDate.getDate(), label: currentDate.getDate()});

  function daysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
  }

  useEffect(
    () => {
      if(isEdit) {
        if(category.isFixed) {
          setAmountValue(category.expense)
        }
        else {
          setAmountValue(category.planned);
        }
        setNameValue(category.name);
        setFixed(category.isFixed);
        setRepeated(category.repeat_id ? true : false);
      }
    },
    [isEdit]
  );

  const dateChange = (selectedOption) => {
    setDateValue(selectedOption);
  }
  const amountChange = (event) => {
    if(event.target.value === NaN) {
      setAmountValue('');
    }
    else{
      setAmountValue(parseFloat(event.target.value));
    }
  }
  const nameChange = (event) => {
    setNameValue(event.target.value);
  }
  const fixedChange = (event) => {
    setFixed(event.target.checked)
  }
  const repeatedChange = (event => {
    setRepeated(event.target.checked)
  })

  const saveCategory = async () => {
    if (amountValue && nameValue){
      await createCategory({
        variables: {
          name: nameValue,
          amount: amountValue,
          isFixed: fixed,
          monthId,
          repeated,
          isEdit,
          categoryId: category ? category.id : null,
          date: dateValue.label,
        }
      });
      if(!isEdit) {
        setAmountValue('');
        setNameValue('');
        setFixed(false);
        setRepeated(false);
      }
      refetchMonth();
      closeModal();
    }
  }

  const [createCategory] = useMutation(MAKE_CATEGORY);

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
            {isEdit ? 'Edit' : 'Add'} Category
          </div>
          <div className="popup-close" onClick={closeModal}><CgCloseO /></div>
        </div>
        <div className="popup-body">
          <div className="input-container">
            <div>Name: </div>
            <input className="category-input" type="text" value={nameValue} onChange={nameChange} />
          </div>
          <div className="input-container">
            <div>{fixed ? 'Expense:' : 'Planned:' }</div>
            <input className="category-input" type="number" value={amountValue} onChange={amountChange} />
          </div>
          <div className="input-container-left">
            <div>Fixed: </div>
            <div className="checkbox-popup-fixed">
              <input className="category-checkbox" type="checkbox" checked={fixed} onChange={fixedChange} />
            </div>
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
          <button className="btn-save" onClick={saveCategory}>Save</button>
        </div>
      </div>
      
    </Modal>
  );

  
}