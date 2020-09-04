module Types
  class MutationType < Types::BaseObject
    
    field :create_spent, mutation: Mutations::CreateSpent do
      description "make a Spent"
      argument :name, String, required: true
      argument :amount, Float, required: true
      argument :date, Integer, required: true
      argument :user_id, ID, required: true
      argument :month_id, ID, required: true
      argument :category_id, ID, required: true
      argument :editing, Boolean, required: true
      argument :spent_id, ID, required: false
    end

    field :delete_spent, mutation: Mutations::DeleteSpent do
      description "Delete Spent"
      argument :spent_id, ID, required: true
      argument :month_id, ID, required: true
      argument :category_id, ID, required: true
    end

    field :create_category, mutation: Mutations::CreateCategory do
      description "Make Category"
      argument :name, String, required: true
      argument :amount, Float, required: true
      argument :is_fixed, Boolean, required: false
      argument :month_id, ID, required: true
      argument :repeated, Boolean, required: false
      argument :category_id, ID, required: false
    end

    field :delete_category, mutation: Mutations::DeleteCategory do
      description "Delete Category"
      argument :month_id, ID, required: true
      argument :category_id, ID, required: true
      argument :repeat_id, ID, required: false

    end

    field :create_income, mutation: Mutations::CreateIncome do
      argument :name, String, required: true
      argument :month_id, ID, required: true
      argument :user_id, ID, required: true
      argument :amount, Float, required: true
      argument :repeated, Boolean, required: false
      argument :date, Integer, required: true
      argument :income_id, ID, required: false
    end

    field :delete_income, mutation: Mutations::DeleteIncome do
      argument :income_id, ID, required: true
      argument :month_id, ID, required: true
    end

  end
end
