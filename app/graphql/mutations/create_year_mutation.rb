class Mutations::CreateYearMutation < Mutations::BaseMutation
  null true
  description: "Creates A Year"
  argument: year_date
  argument: account_id

  def resolve(year_date, account_id)
    User.crate(year_date: year_date, account_id: account_id)
  end
end