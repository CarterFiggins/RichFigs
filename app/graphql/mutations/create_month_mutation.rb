class Mutations::CreateMonthMutation < Mutations::BaseMutation
  null true
  description: "Creates A Month"
  argument: account_id
  argument: date
  argument: year_id
  argument: income
  argument: planned
  argument: expense

  def resolve(account_id, date, year_id, income, planned, expense)
    Month.create(account_id: account_id, date: date, income: income, planned: planned, expense: expense, year_id: year_id)
  end
end