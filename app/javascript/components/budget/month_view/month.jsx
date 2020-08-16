import React, { useState } from 'react';

import MonthInfo from './month_info';
import Menu from './menu';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CategoryList from './category_list';

console.log("before gql")

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

  // find a way to get accountID
  const variables = {
    yearDate: yearDate,
    date: monthDate,
    accountID: 1,
  };

  const { loading, error, data } = useQuery(GET_MONTH_INFO, { variables });

  if (error){ 
    console.log(error)
    return <div> Bad things happened </div>;
  }
  if(loading){
    return <div> Loading </div>
  }

  console.log(data.month.id)

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
        <MonthInfo info={data.month} />
      </div>
      <div className="category-title">
        Categories
      </div>
      <div>
        <CategoryList monthID={data.month.id} />
      </div>
    </div>
  );
  
  
}