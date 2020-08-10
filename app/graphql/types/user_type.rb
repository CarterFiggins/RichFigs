class Types::UserType < Types::BaseObject
  field :id, ID, null: false
  field :user_name, String, null: false
  field :password, String, null: false
  field :color, String, null: false
  field :account_id, ID, null: false
end