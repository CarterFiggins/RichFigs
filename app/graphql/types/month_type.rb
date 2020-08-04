class Types::Month < Types::BaseObject
  field :id, ID, null: false
  field :account_id, ID, null: false
  field :income, Float, null: false
  field :planned, Float, null: false
  field :expense, Float, null: false
  field :date, String, null: false
end