class Mutations::CreateCategory < Mutations::BaseMutation
  null true
  description "Make Category"
  field :category, Types::CategoriesType, null: false
  argument :name, String, required: true
  argument :amount, Float, required: true
  argument :is_fixed, Boolean, required: false
  argument :month_id, ID, required: true
  argument :repeated, Boolean, required: false

  def resolve(name:, amount:, is_fixed:, month_id:, repeated:)
    # TODO: Repeat
    planned = nil
    expense = 0
    month = Month.find(month_id)
    if is_fixed
      month.update(expense: amount + month.expense)
      expense = amount;
    else
      planned = amount;
    end
    category = Category.create(name: name, planned: planned, expense: expense, is_fixed: is_fixed, month_id: month_id, date: Time.now)
    { category: category }
  end

end