class Types::Pay < Types::BaseObject
  field :id, ID, null: false
  field :name, String, null: false
  field :month_id, ID, null: false
  field :user_id, ID, null: false
  field :repeat_id, ID, null: true
  field :date, Date, null: false
  field :amount, Float, null: false
end