class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.integer :planned
      t.integer :expense
      t.string :spent_id

      t.timestamps
    end
  end
end
