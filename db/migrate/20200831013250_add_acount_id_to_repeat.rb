class AddAcountIdToRepeat < ActiveRecord::Migration[6.0]
  def change
    add_column :repeats, :account_id, :integer
  end
end
