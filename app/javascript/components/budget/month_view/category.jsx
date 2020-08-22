import React, { useState } from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import { useQuery, useMutation} from '@apollo/react-hooks';
import ExpensePopup from '../common/expense_popup';
import { BsPlusCircleFill } from 'react-icons/bs'
import { ImBin } from 'react-icons/im'
import { FiEdit } from 'react-icons/fi'
import ExpenseViewPopup from '../common/expense_view_popup';


const GET_SPENTS = gql`
  query spentList($categoryId: ID!){
    spents(categoryId: $categoryId){
      id
      name
      amount
      date
      user{
        id
        userName
      }
    }
  }
`;

const MAKE_SPENT = gql`
  mutation makeSpent($name: String!, $amount: Float!, $userId: ID!, $monthId: ID!, $categoryId: ID!) {
    createSpent(name: $name, amount: $amount, userId: $userId, monthId: $monthId, categoryId: $categoryId) {
      spent {
        id
      }
    }
  }
`;


export default function Category(props) {

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);

  const { category, monthId, monthDate } = props;

  const variables = {
    categoryId: category.id
  };

  const { loading, error, data, refetch } = useQuery(GET_SPENTS, { variables });

  if (error){ 
    console.log(error);
    return <div> Bad things happened </div>;
  }
  if(loading){
    return <div> Loading </div>;
  }


  const refetchMonth = () => {
    refetch();
    props.refetchMonth();
  }

  return(
    <div className="category-box">
      <div className="category-info">
        <div className="category-name">
          {category.name} 
        </div>
        <div className="flex">
          <div className="icon-button-edit">
            <FiEdit />
          </div>
          <div className="icon-button-delete">
            <ImBin />
          </div>
        </div>
      </div>
      <div className="category-body">
        <div className="category-value">
          Planned: ${category.planned}
        </div>
        <div className="category-value">
          Expenses: ${category.expense}
        </div>
        <div className="icon-button-add" onClick={() => setIsOpenAdd(true)}>
          <BsPlusCircleFill />
        </div>
      </div>
      <div className="view-expenses">
        <button onClick={() => setIsOpenView(true)}>View Expenses</button>
      </div>
      <ExpenseViewPopup
        isOpen={isOpenView}
        closeModal={() => setIsOpenView(false)}
        refetchMonth={refetchMonth}
        spents={data.spents}
        category={category}
      />
      <ExpensePopup
        isOpen={isOpenAdd}
        closeModal={() => setIsOpenAdd(false)}
        refetchMonth={refetchMonth}
        category={category}
        monthDate={monthDate}
        monthId={monthId}
      />
    </div>
  );

  
}