import React from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';

const MAKE_SPENT = gql`
  mutation makeSpent($name: String!, $amount: Float!, $userId: ID!, $monthId: ID!, $categoryId: ID!) {
    createSpent(name: $name, amount: $amount, userId: $userId, monthId: $monthId, categoryId: $categoryId) {
      spent {
        id
      }
    }
  }
`;

export default function CategoryPopup(props) {

  const {isOpen, closeModal } = props

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
        <div>Name: </div>
        <div>Planned Amount: </div>
      </div>
      
    </Modal>
  );

  
}