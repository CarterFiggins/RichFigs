class Types::SpentType < Types::BaseObject
  field :id, ID, null: false
  field :user_id, ID, null: false
  field :category_id, ID, null: false
  field :repeat_id, ID, null: true
  field :name, String, null: false
  field :amount, Float, null: false
  field :date, Date, null: false
end
