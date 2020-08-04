class Types::Incomes < Types::BaseObject
  field :id, ID, null: false
  field :name, String, null: false
  field :month_id, ID, null: false
  field :user_id, ID, null: false
  field :amount, Float, null: false
end