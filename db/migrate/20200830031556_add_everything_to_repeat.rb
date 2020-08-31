class AddEverythingToRepeat < ActiveRecord::Migration[6.0]
  def change
    add_column :repeats, :amount, :float
    add_column :repeats, :name, :string
    add_column :repeats, :date, :datetime
  end
end
