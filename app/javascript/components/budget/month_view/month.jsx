import React from 'react';

import MonthInfo from './month_info';
import Category from './month_info';
import Menu from './menu';

export default function Month() {
  return(
    <div>
      <div>
        <Menu />
      </div>
      <div className="test">
        (Name Of Budget)
      </div>
      <div>
        <MonthInfo />
      </div>
      <div>
        <Category />
      </div>
      You are at the Month View
    </div>
  );
  
  
}