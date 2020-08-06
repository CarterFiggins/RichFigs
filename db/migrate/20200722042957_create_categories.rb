class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.integer :month_id
      t.integer :repeat_id
      t.string :name
      t.float :planned
      t.float :expense
      t.datetime :date

      t.timestamps
    end
  end
end
