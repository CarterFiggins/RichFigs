class Mutations::CreateSpentMutation < Mutations::BaseMutation
  null true
  description: "Creates a Spent"
  argument: name
  argument: month_id
  argument: user_id
  argument: amount

  def resolve(name, month_id, user_id, amount)
    Spent.create(name: name, month_id: month_id, user_id: user_id, amount: amount)
  end
end