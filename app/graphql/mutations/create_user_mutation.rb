class Mutations::CreateUserMutation < Mutations::BaseMutation
  null true
  description: "Creates An Account"
  argument: user_name
  argument: password
  argument: color
  argument: account_id

  def resolve(user_name, password, color, account_id)
    User.crate(user_name: user_name, password: password, color: color, account_id: account_id)
  end
end