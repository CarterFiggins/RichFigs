class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :user_name
      t.string :password
      t.string :color
      t.integer :account_id

      t.timestamps
    end
  end
end
