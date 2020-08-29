import React, { useState } from 'react';

import MonthInfo from './month_info';
import Menu from './menu';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CategoryList from './category_list';
import { BsPlusCircleFill } from 'react-icons/bs'

const GET_MONTH_INFO = gql`
  query MonthData($yearDate: Int, $date: String, $accountID: ID!) {
    year(yearDate: $yearDate, accountId: $accountID) {
      id
      yearDate
    }
    month(yearDate: $yearDate, date: $date, accountId: $accountID){
      id
      date
      income
      planned
      expense
    }
    
  }
`;

export default function Month() {

  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('default', {month: 'long'});

  const [yearDate, setYearDate] = useState(year);
  const [monthDate, setMonth] = useState(month);

  const USER_ID = 1;

  // find a way to get accountID
  const variables = {
    yearDate: yearDate,
    date: monthDate,
    accountID: 1,
  };

  const { loading, error, data, refetch } = useQuery(GET_MONTH_INFO, { variables });

  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenIncome, setIsOpenIncome] = useState(false);

  if (error){ 
    console.log(error)
    return <div> Bad things happened </div>;
  }
  if(loading){
    return <div> Loading </div>
  }

  return(
    <div>
      <div>
        <Menu />
      </div>
      <div className="large-text account-name">
        Fig Budget
      </div>
      <div className="large-text center">{data.year.yearDate}</div>
      <div>
        <MonthInfo 
          info={data.month}
          userId={USER_ID}
          monthId={data.month.id}
          fireIncomePopup={() => setIsOpenIncome(true)}
          closePopup={() => setIsOpenIncome(false)}
          isOpenIncome={isOpenIncome}
          refetchMonth={refetch}
        />
      </div>
      <div className="category-title">
        <div>
          Categories 
        </div>
        <div className="icon-button-add" onClick={() => setIsOpenCategory(true)}>
          <BsPlusCircleFill />
        </div>
      </div>
      <div>
        <CategoryList
          monthId={data.month.id}
          monthDate={monthDate}
          refetchMonth={refetch}
          userId={USER_ID}
          isOpen={isOpenCategory}
          closeModal={() => setIsOpenCategory(false)}
        />
      </div>
    </div>
  );
  
  
}