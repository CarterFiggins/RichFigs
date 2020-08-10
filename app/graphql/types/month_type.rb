class Types::MonthType < Types::BaseObject
  field :id, ID, null: false
  field :date, String, null: false
  field :year_id, ID , null: false
  field :income, Float, null: false
  field :planned, Float, null: false
  field :expense, Float, null: false
end
