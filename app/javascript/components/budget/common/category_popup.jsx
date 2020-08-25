import React, { useState } from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import { CgCloseO } from 'react-icons/cg';


const MAKE_CATEGORY = gql`
  mutation makeCategory($name: String!, $amount: Float!, $isFixed: Boolean!, $monthId: ID!, $repeated: Boolean) {
    createCategory(name: $name, amount: $amount, isFixed: $isFixed, monthId: $monthId, repeated: $repeated) {
      category {
        id
      }
    }
  }
`;

export default function CategoryPopup(props) {

  // TODO: make mutation for createing and deleting category and edit

  const {isOpen, closeModal, monthId, refetchMonth } = props

  const [amountValue, setAmountValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [fixed, setFixed] = useState(false);
  const [repeated, setRepeated] = useState(false);

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
      console.log("hello")
      console.log(amountValue)
      console.log(nameValue)
      await createCategory({
        variables: {
          name: nameValue,
          amount: amountValue,
          isFixed: fixed,
          monthId,
          repeated,
        }
      });
      refetchMonth();
      closeModal();
    }
  }

  const [createCategory] = useMutation(MAKE_CATEGORY);

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
            Add Category
          </div>
          <div className="popup-close" onClick={closeModal}><CgCloseO /></div>
        </div>
        <div className="popup-body">
          <div className="input-container">
            <div>Name: </div>
            <input className="category-input" type="text" value={nameValue} onChange={nameChange} />
          </div>
          <div className="input-container">
            <div>{fixed ? 'Expence:' : 'Planned:' }</div>
            <input className="category-input" type="number" value={amountValue} onChange={amountChange} />
          </div>
          <div className="input-container-left">
            <div>Fixed: </div>
            <div className="checkbox-popup-fixed">
              <input className="category-checkbox" type="checkbox" onChange={fixedChange} />
            </div>
          </div>
          <div className="input-container-left">
            <div>Repeat: </div>
            <div className="checkbox-popup-repeat">
              <input className="category-checkbox" type="checkbox" onChange={repeatedChange} />
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