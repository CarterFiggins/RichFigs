class Mutations::CreateSpentMutation < Mutations::BaseMutation
  null true
  description: "Creates a Spent"
  argument: name
  argument: category_id
  argument: user_id
  argument: repeat_id
  argument: amount
  argument: date

  def resolve(name, category_id, user_id, repeat_id, amount, date)
    Spent.create(name: name, category_id: category_id, user_id: user_id, repeat_id: repeat_id, amount: amount, date: date)
  end
end