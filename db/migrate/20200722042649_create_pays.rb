class CreatePays < ActiveRecord::Migration[6.0]
  def change
    create_table :pays do |t|
      t.string :name
      t.integer :month_id
      t.integer :user_id
      t.integer :repeat_id
      t.datetime :date
      t.float :amount

      t.timestamps
    end
  end
end
