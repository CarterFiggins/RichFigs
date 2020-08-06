class CreateSpents < ActiveRecord::Migration[6.0]
  def change
    create_table :spents do |t|
      t.integer :user_id
      t.integer :category_id
      t.integer :repeat_id
      t.string :name
      t.float :amount
      t.datetime :date

      t.timestamps
    end
  end
end
