class Mutations::CreateSpent < Mutations::BaseMutation
  null true
  description "make a Spent"
  field :success, Boolean, null: false
  argument :name, String, required: true
  argument :amount, Float, required: true
  argument :date, Integer, required: true
  argument :user_id, ID, required: true
  argument :month_id, ID, required: true
  argument :category_id, ID, required: true
  argument :editing, Boolean, required: true
  argument :spent_id, ID, required: false

  def resolve(name:, amount:, date:, user_id:, month_id:, category_id:, editing:, spent_id:)
    category = Category.find(category_id)
    month = Month.find(month_id)
    date = Time.new(2020, Date::MONTHNAMES.index(month.date), date)
    if (editing)
      oldSpent = Spent.find(spent_id)
      category.update(expense: amount - oldSpent.amount + category.expense)
      month.update(expense: amount - oldSpent.amount + month.expense)
      spent = Spent.find(spent_id).update(name: name, amount: amount, user_id: user_id, category_id: category_id, date: date)
      {success: true}
    
    else 
      category.update(expense: amount + category.expense)
      month.update(expense: amount + month.expense)
      spent = Spent.create(name: name, amount: amount, user_id: user_id, category_id: category_id, date: date)
      { success: true }
    end
  end

end