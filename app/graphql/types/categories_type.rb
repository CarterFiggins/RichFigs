class Types::Categories < Types::BaseObject
  field :id, ID, null: false
  field :spent_id, ID, null: false
  field :name, String, null: false
  field :planned, Int, null: false
  field :expense, Int, null: false
end