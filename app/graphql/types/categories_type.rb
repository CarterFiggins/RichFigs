class Types::Categories < Types::BaseObject
  field :id, ID, null: false
  field :name, String, null: false
  field :planned, Float, null: false
  field :expense, Float, null: false
  field :month_id, ID, null: false
end