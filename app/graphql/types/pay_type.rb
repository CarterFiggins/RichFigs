class Types::Pay < Types::BaseObject
  field :id, ID, null: false
  field :name, String, null: false
  field :amount, Float, null: false
end