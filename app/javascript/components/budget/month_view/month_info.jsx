import React from 'react';

export default function MonthInfo() {
  return(
    <div>
      <div className="center">
        <span className="goto-month-name">
          June
        </span>
        <span className="large-text main-month-name">
          July
        </span>
        <span className="goto-month-name">
          Auguest
        </span>
      </div>
      <div className="center">
        <span className="month-info">
          Income: $0.00
        </span>
        <span className="month-info">
          Planned: $0.00 
        </span>
        <span className="month-info">
          Expenses: $0.00
        </span>
      </div>
    </div>
  );
  
  
}