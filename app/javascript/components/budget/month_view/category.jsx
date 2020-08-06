import React from 'react';
import { gql } from '@apollo/client';

// const GET_CATEGORIES = gql`

// `;

export default function Category() {
  return(
    <div className="category-box">
      <span className="category-info">
        Rent
      </span>
      <div className="center space">
        <span className="category-info">
          Planned: $0.00
        </span>
        <span className="category-info">
          Expenses: $0.00
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
    </div>
  );

  
}