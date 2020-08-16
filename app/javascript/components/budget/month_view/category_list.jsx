import React from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import Category from './category';
import { useQuery } from '@apollo/react-hooks';


const GET_CATEGORIES = gql`
  query CategoryList($monthId: ID!){
    category(monthId: $monthId){
      id
      name
      planned
      expense
    }
  }
`;

export default function CategoryList(props) {

  console.log("monthID")
  console.log(props.monthID)
  const variables = {
    monthId: props.monthID
  };

  const { loading, error, data } = useQuery(GET_CATEGORIES, { variables });

  if (error){ 
    console.log(error)
    return <div> Bad things happened </div>;
  }
  if(loading){
    return <div> Loading </div>
  }

  console.log(data)


  return(
      _.map(data.category, (category)=> {
        return <Category key={category.id} category={category} />
      })
  );

  
}