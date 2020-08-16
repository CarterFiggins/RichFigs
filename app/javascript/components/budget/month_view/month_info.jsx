import React from 'react';

export default function MonthInfo(props) {
  const { info } = props

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
          Income: ${info.income}
        </span>
        <span className="month-info">
          Planned: ${info.planned}
        </span>
        <span className="month-info">
          Expenses: ${info.expense}
        </span>
      </div>
    </div>
  );
  
  
}