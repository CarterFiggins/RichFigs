class Types::CategoriesType < Types::BaseObject
  field :id, ID, null: false
  field :month_id, ID, null: false
  field :repeat_id, ID, null: true
  field :name, String, null: false
  field :planned, Float, null: false
  field :expense, Float, null: false
  field :is_fixed, Boolean, null: true
  field :date, GraphQL::Types::ISO8601Date , null: false
end
