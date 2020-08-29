import React, { useState } from 'react';
import _ from 'lodash';
import { BsPlusCircleFill, BsFillEyeFill } from 'react-icons/bs'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import IncomePopup from './income_popup';
import IncomeView from './income_view';


const GET_INCOMES = gql`
  query incomeList($monthId: ID!){
    incomes(monthId: $monthId){
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


export default function MonthInfo(props) {
  const {
    info,
    fireIncomePopup,
    closePopup,
    isOpenIncome, 
    refetchMonth,
    monthId,
    userId,
  } = props

  const [isOpenView, setIsOpenView] = useState (false)

  const { loading, error, data, refetch } = useQuery(GET_INCOMES, { variables: {monthId} });

  if (error){ 
    console.log(error);
    return <div> Bad things happened </div>;
  }
  if(loading){
    return <div> Loading </div>;
  }

  return(
    <div>
      <div className="center">
        <span className="goto-month-name">
          Pev Month
        </span>
        <span className="large-text main-month-name">
          {info.date}
        </span>
        <span className="goto-month-name">
          Next Month
        </span>
      </div>
      <div className="center">
        <span className="month-info">
          Total: ${_.round(info.income - info.expense,2)}
        </span>
        <span className="month-info">
          Income: ${_.round(info.income,2)}
          <span className="icon-button-add" onClick={fireIncomePopup}>
            <BsPlusCircleFill />
          </span>
          {data.incomes.length != 0 && (
            <span className="icon-button" onClick={() => setIsOpenView(true)}>
              <BsFillEyeFill />
            </span>
          )}
        </span>
        <span className="month-info">
          Planned: ${_.round(info.planned,2)}
        </span>
        <span className="month-info">
          Expenses: ${_.round(info.expense,2)}
        </span>
      </div>
      <IncomePopup
        isOpen={isOpenIncome}
        closeModal={closePopup}
        refetchMonth={() => { refetchMonth(); refetch(); }}
        monthId={monthId}
        userId={userId}
      />
      <IncomeView
        isOpen={isOpenView}
        closeModal={() => setIsOpenView(false)}
        refetchMonth={() => { refetchMonth(); refetch(); }}
        monthId={monthId}
        userId={userId}
        incomes={data.incomes}
      />
    </div>
  );
  
  
}