class CreateSpents < ActiveRecord::Migration[6.0]
  def change
    create_table :spents do |t|
      t.string :name
      t.float :amount
      t.integer :category_id

      t.timestamps
    end
  end
end
