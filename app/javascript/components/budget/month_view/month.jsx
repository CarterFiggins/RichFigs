import React, { useState, useEffect } from 'react';

import MonthInfo from './month_info';
import Menu from './menu';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CategoryList from './category_list';
import { BsPlusCircleFill } from 'react-icons/bs'

const GET_MONTH_INFO = gql`
  query MonthData($yearDate: Int, $date: String, $accountID: ID!, $monthNum: Int, $userId: ID!) {
    year(yearDate: $yearDate, accountId: $accountID) {
      id
      yearDate
    }
    month(yearDate: $yearDate, date: $date, accountId: $accountID, monthNum: $monthNum, userId: $userId){
      id
      date
      income
      planned
      expense
    }

  }
`;

export default function Month() {

  // find a way to get accountID and UserId
  const USER_ID = 1;

  const getMonthName = (d) => {
    return d.toLocaleString('default', {month: 'long'});
  }
  const date = new Date ()
  const [yearDate, setYearDate] = useState(date.getFullYear());
  const [monthDate, setMonthDate] = useState(getMonthName(date));
  const [currentDate, setCurrentDate] = useState(date);

  useEffect(() => {
    const date = new Date()
    setCurrentDate(date);
    setYearDate(date.getFullYear());
    setMonthDate(getMonthName(date));
  }, [])

  const variables = {
    yearDate: yearDate,
    date: monthDate,
    accountID: 1,
    monthNum: currentDate ? currentDate.getMonth() + 1 : null,
    userId: USER_ID,
  };

  const { loading, error, data, refetch } = useQuery(GET_MONTH_INFO, { variables });

  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenIncome, setIsOpenIncome] = useState(false);
  const changeMonth = (num) => {
    let monthNum = currentDate.getMonth() + num
    let newYear = yearDate
    if (monthNum === 12) {
      monthNum = 0;
      newYear += 1;
    }
    if (monthNum === -1) {
      monthNum = 11;
      newYear -= 1;
    }
    setYearDate(newYear)
    let newDate = new Date(newYear, monthNum, 1)
    setCurrentDate(newDate)
    setMonthDate(getMonthName(newDate))
  }


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
      <div className="account-name">
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
          changeMonth={changeMonth}
          currentDate={currentDate}
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
          currentDate={currentDate}
        />
      </div>
    </div>
  );


}