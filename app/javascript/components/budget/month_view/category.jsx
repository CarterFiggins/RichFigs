import React from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import { useQuery, useMutation} from '@apollo/react-hooks';

const GET_SPENTS = gql`
  query spentList($categoryId: ID!){
    spents(categoryId: $categoryId){
      id
      name
      amount
      user{
        id
        userName
      }
    }
  }
`;

const MAKE_SPENT = gql`
  mutation makeSpent($name: String!, $amount: Float!, $userId: ID!) {
    createSpent(name: $name, amount: $amount, userId: $userId){
      id
      name
      amount
    }
  }
`;


export default function Category(props) {

  const {category} = props;

  const variables = {
    categoryId: category.id
  };

  const { loading, error, data } = useQuery(GET_SPENTS, { variables });
  const [createSpent] = useMutation(MAKE_SPENT);

  if (error){ 
    console.log(error)
    return <div> Bad things happened </div>;
  }
  if(loading){
    return <div> Loading </div>
  }

  const addExpence = (name, amount, userId) => {
    test = createSpent(name, amount, userId)
    console.log(test)
  }

  console.log(data)
  return(
    <div className="category-box">
      <span className="category-info">
        {category.name} <button onClick={() => addExpence("spendings", 20, 1)}>Add expence</button>
      </span>
      <div className="center space">
        <span className="category-info">
          Planned: ${category.planned}
        </span>
        <span className="category-info">
          Expenses: ${category.expense}
        </span>
      </div>
      <div className="center space">
        <span className="add-expense">
          Add Expense
        </span>
        <span className="view-expenses">
          View Expenses
        </span>
      </div>
      <div>
        {_.map(data.spents, (spent) => {
          return (
            <div key={spent.id}> 
              {spent.name}: {spent.amount} By: {spent.user.userName}
            </div>
          )
        })}
      </div>
    </div>
  );

  
}