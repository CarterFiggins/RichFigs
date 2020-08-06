class Mutations::CreateAccountMutation < Mutations::BaseMutation
  null true
  description: "Creates An Account"
  argument: name

  def resolve(name)
    Account.create(name: name)
  end

end