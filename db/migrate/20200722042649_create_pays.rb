class CreatePays < ActiveRecord::Migration[6.0]
  def change
    create_table :pays do |t|
      t.string :name
      t.integer :ammount

      t.timestamps
    end
  end
end
