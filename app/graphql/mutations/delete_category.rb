class Mutations::DeleteCategory < Mutations::BaseMutation
  null true
  description "Delete a Category"
  field :deleted, Boolean, null: false 
  argument :month_id, ID, required: true
  argument :category_id, ID, required: true

  def resolve(month_id:, category_id:)
    category = Category.find(category_id)
    month = Month.find(month_id)
    month.update(expense: month.expense - category.expense, planned: month.planned - category.planned)
    Spent.where(category_id: category_id).delete_all
    category.delete
    {deleted: true}
  end

end