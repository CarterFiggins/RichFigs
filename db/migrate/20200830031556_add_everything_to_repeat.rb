class AddEverythingToRepeat < ActiveRecord::Migration[6.0]
  def change
    add_column :repeats, :amount, :float
    add_column :repeats, :name, :string
    add_column :repeats, :year_date, :integer
    add_column :repeats, :month_date, :integer
    add_column :repeats, :day_date, :integer
  end
end
