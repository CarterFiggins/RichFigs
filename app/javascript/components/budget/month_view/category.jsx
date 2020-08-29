import React, { useState } from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ExpensePopup from '../common/expense_popup';
import { BsPlusCircleFill, BsFillEyeFill } from 'react-icons/bs'
import { ImBin } from 'react-icons/im'
import { FiEdit } from 'react-icons/fi'
import ExpenseViewPopup from '../common/expense_view_popup';
import DeletePopup from '../common/delete_popup';
import CategoryPopup from '../common/category_popup';


const GET_SPENTS = gql`
  query spentList($categoryId: ID!){
    spents(categoryId: $categoryId){
      id
      name
      amount
      date
      user{
        id
        userName
      }
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation deleteSpent($monthId: ID!, $categoryId: ID!) {
    deleteCategory(monthId: $monthId, categoryId: $categoryId){
      deleted
    }
  }
`;


export default function Category(props) {

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const { category, monthId, monthDate, userId, categoryList } = props;

  const variables = {
    categoryId: category.id
  };

  const { loading, error, data, refetch } = useQuery(GET_SPENTS, { variables });
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  if (error){ 
    console.log(error);
    return <div> Bad things happened </div>;
  }
  if(loading){
    return <div> Loading </div>;
  }

  const refetchMonth = () => {
    refetch();
    props.refetchMonth();
  };

  const deleteItem = async () => {
    await deleteCategory({ variables: { monthId, categoryId: category.id } })
    refetchMonth()
  };

  return(
    <div className="category-box">
      <div className="category-info">
        <div className="category-name">
          {category.name} 
        </div>
        <div className="flex">
          <div className="icon-button-edit" onClick={() => setIsOpenEdit(true)}>
            <FiEdit />
          </div>
          <div className="icon-button-delete" onClick={() => setIsDeleteOpen(true)}>
            <ImBin />
          </div>
        </div>
      </div>
      <div className="category-body">
        { !category.isFixed && (
          <>
            <div className="category-value">
              Left Over: ${category.planned - category.expense}
            </div>
            <div className="category-value">
              Planned: ${category.planned}
            </div>
          </>
        )}
        <div className="category-value">
          Expense: ${category.expense}
        </div>
        { !category.isFixed && (
          <>
            <div className="icon-button-add" onClick={() => setIsOpenAdd(true)}>
              <BsPlusCircleFill />
            </div>
            {data.spents.length != 0 && (
              <div className="icon-button" onClick={() => setIsOpenView(true)}>
                <BsFillEyeFill />
              </div>
            )}
          </>
        )}
      </div>
      <ExpenseViewPopup
        isOpen={isOpenView}
        closeModal={() => setIsOpenView(false)}
        refetchMonth={refetchMonth}
        spents={data.spents}
        category={category}
        monthId={monthId}
        userId={userId}
        categoryList={categoryList}
      />
      <ExpensePopup
        isOpen={isOpenAdd}
        closeModal={() => setIsOpenAdd(false)}
        refetchMonth={refetchMonth}
        category={category}
        monthId={monthId}
        userId={userId}
        categoryList={categoryList}
        isEdit={false}
      />
      <DeletePopup
        isOpen={isDeleteOpen}
        closeModal={() => setIsDeleteOpen(false)}
        deleteItem={() => deleteItem()}
      />
      <CategoryPopup
        isOpen={isOpenEdit}
        closeModal={() => setIsOpenEdit(false)}
        monthId={monthId}
        refetchMonth={refetchMonth}
        category={category}
        isEdit={true}
      />
    </div>
  );

  
}