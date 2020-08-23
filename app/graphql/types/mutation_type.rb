module Types
  class MutationType < Types::BaseObject
    
    field :create_spent, mutation: Mutations::CreateSpent do
      description "make a Spent"
      argument :name, String, required: true
      argument :amount, Float, required: true
      argument :user_id, ID, required: true
      argument :month_id, ID, required: true
      argument :category_id, ID, required: true
    end

    field :delete_spent, mutation: Mutations::DeleteSpent do
      description "Delete Spent"
      argument :spent_id, ID, required: true
      argument :month_id, ID, required: true
      argument :category_id, ID, required: true
    end
  end
end
