import React from 'react';

import MonthInfo from './month_info';
import Category from './category';
import Menu from './menu';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

console.log("before gql")

const GET_MONTH_INFO = gql`
  query year($year_date: Int!) {
    getYear(year_date: $year_date) {
      id
      year_date
      # month {
      #   id
      #   date
      #   income
      #   planned
      #   expense
      # }
    }
  }
`;

export default function Month() {

  const variables = {
    year_date: 2020
  };

  console.log("before Query")
  const { loading, error, data } = useQuery(GET_MONTH_INFO, { variables });

  console.log(data)

  return(
    <div>
      <div>
        <Menu />
      </div>
      <div className="large-text account-name">
        Fig Budget
      </div>
      <div>
        <MonthInfo />
      </div>
      <div className="category-title">
        Categories
      </div>
      <div>
        <Category />
      </div>
    </div>
  );
  
  
}