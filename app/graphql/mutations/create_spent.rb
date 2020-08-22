class Mutations::CreateSpent < Mutations::BaseMutation
  null true
  description "make a Spent"
  field :spent, Types::SpentType, null: false
  argument :name, String, required: true
  argument :amount, Float, required: true
  argument :user_id, ID, required: true
  argument :month_id, ID, required: true
  argument :category_id, ID, required: true

  def resolve(name:, amount:, user_id:, month_id:, category_id:)
    category = Category.find(category_id)
    month = Month.find(month_id)
    category.update(expense: amount + category.expense)
    month.update(expense: amount + month.expense)
    spent = Spent.create(name: name, amount: amount, user_id: user_id, category_id: category_id, date: Time.now)
    { spent: spent }
  end

end