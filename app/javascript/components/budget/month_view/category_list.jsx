import React from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import Category from './category';
import { useQuery } from '@apollo/react-hooks';
import CategoryPopup from '../common/category_popup'

const GET_CATEGORIES = gql`
  query CategoryList($monthId: ID!){
    categories(monthId: $monthId){
      id
      name
      planned
      expense
      isFixed
    }
  }
`;

export default function CategoryList(props) {

  const { monthId, monthDate, userId, isOpen, closeModal} = props

  const variables = {
    monthId: monthId
  };

  const { loading, error, data, refetch} = useQuery(GET_CATEGORIES, { variables });

  const refetchMonth = () => {
    refetch()
    props.refetchMonth()
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
      {_.map(data.categories, (category)=> {
        return (
          <Category
            key={category.id}
            category={category}
            monthId={monthId}
            refetchMonth={refetchMonth}
            monthDate={monthDate}
            userId={userId}
            categoryList={data.categories}
          />
        )
      })}
      <CategoryPopup 
        isOpen={isOpen}
        closeModal={closeModal}
        monthId={monthId}
        refetchMonth={refetchMonth}
        isEdit={false}
      />
    </div>
  );

  
}