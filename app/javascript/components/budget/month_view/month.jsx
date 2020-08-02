import React from 'react';

import MonthInfo from './month_info';
import Category from './category';
import Menu from './menu';

export default function Month() {
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