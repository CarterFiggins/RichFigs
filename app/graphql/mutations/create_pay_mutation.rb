class Mutations::CreatePayMutation < Mutations::BaseMutation
  null true
  description: "Creates A Pay"
  argument: name
  argument: month_id
  argument: user_id
  argument: amount

  def resolve(name, month_id, user_id, amount)
    Pay.create(name: name, month_id: month_id, user_id: user_id, amount: amount)
  end
end