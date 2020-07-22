class CreateMonths < ActiveRecord::Migration[6.0]
  def change
    create_table :months do |t|
      t.string :date
      t.integer :category_id
      t.integer :income
      t.integer :planned
      t.integer :expense
      t.integer :pay_id

      t.timestamps
    end
  end
end
