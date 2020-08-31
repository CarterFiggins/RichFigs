class AddTypeToRepeat < ActiveRecord::Migration[6.0]
  def change
    add_column :repeats, :transaction_type, :string
  end
end
