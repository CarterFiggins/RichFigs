class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.float :planned
      t.float :expense
      t.integer :month_id

      t.timestamps
    end
  end
end
