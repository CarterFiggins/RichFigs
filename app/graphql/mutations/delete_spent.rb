class Mutations::DeleteSpent < Mutations::BaseMutation
  null true
  description "Delete a Spent"
  field :deleted, Boolean, null: false 
  argument :spent_id, ID, required: true
  argument :month_id, ID, required: true
  argument :category_id, ID, required: true

  def resolve(spent_id:, month_id:, category_id:)
    category = Category.find(category_id)
    month = Month.find(month_id)
    spent = Spent.find(spent_id)
    category.update(expense: category.expense - spent.amount)
    month.update(expense: month.expense - spent.amount)
    spent.delete
    {deleted: true}
  end

end