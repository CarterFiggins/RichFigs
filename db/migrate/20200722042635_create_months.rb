class CreateMonths < ActiveRecord::Migration[6.0]
  def change
    create_table :months do |t|
      t.string :date
      t.integer :account_id
      t.integer :year_id
      t.float :income
      t.float :planned
      t.float :expense

      t.timestamps
    end
  end
end
