class AddIsFixedToCategory < ActiveRecord::Migration[6.0]
  def change
    add_column :categories, :is_fixed, :boolean
  end
end
