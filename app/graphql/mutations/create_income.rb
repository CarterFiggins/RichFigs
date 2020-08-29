class Mutations::CreateIncome < Mutations::BaseMutation
  null true
  field :success, Boolean, null: false
  argument :name, String, required: true
  argument :month_id, ID, required: true
  argument :user_id, ID, required: true
  argument :amount, Float, required: true
  argument :repeated, Boolean, required: false
  argument :date, Integer, required: true
  argument :income_id, ID, required: false

  def resolve(name:, amount:, date:, user_id:, month_id:, income_id:, repeated:)
    month = Month.find(month_id)
    date = Time.new(2020, Date::MONTHNAMES.index(month.date), date)
    if (income_id)
      oldIncome = Income.find(income_id)
      month.update(income: amount + month.income - oldIncome.amount)
      oldIncome.update(name: name, amount: amount, user_id: user_id, month_id: month_id, date: date, repeat_id: nil)
      {success: true}
    else 
      month.update(income: amount + month.income)
      Income.create(name: name, amount: amount, user_id: user_id, month_id: month_id, date: date, repeat_id: nil)
      { success: true }
    end
  end

end