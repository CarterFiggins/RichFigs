class Types::Spents < Types::BaseObject
  field :id, ID, null: false
  field :category_id, ID, null: false
  field :name, String, null: false
  field :amount, Float, null: false
end