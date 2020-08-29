class CreateIncomes < ActiveRecord::Migration[6.0]
  def change
    create_table :incomes do |t|
      t.string :name
      t.integer :month_id
      t.integer :user_id
      t.float :amount
      t.integer :repeat_id
      t.datetime :date

      t.timestamps
    end
  end
end
