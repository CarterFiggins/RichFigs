class Mutations::DeleteIncome < Mutations::BaseMutation
  null true
  description "Delete a Income"
  field :deleted, Boolean, null: false 
  argument :month_id, ID, required: true
  argument :income_id, ID, required: true

  def resolve(month_id:, income_id:)
    income = Income.find(income_id)
    month = Month.find(month_id)
    month.update(income: month.income - income.amount)
    income.delete
    {deleted: true}
  end

end