class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.string :name
      t.float :amount
      t.integer :user_id
      t.string :type

      t.timestamps
    end
  end
end
