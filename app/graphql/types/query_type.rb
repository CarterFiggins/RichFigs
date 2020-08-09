module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    field :get_users, Type::User, null: false do
      description: "gets all Users"
    end

    def get_users
      User.all
    end
  end
end
