class Types::CategoriesType < Types::BaseObject
  field :id, ID, null: false
  field :month_id, ID, null: false
  field :repeat_id, ID, null: true
  field :name, String, null: false
  field :planned, Float, null: false
  field :expense, Float, null: false
  field :date, Date , null: false
end