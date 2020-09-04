class AddAliveToRepeat < ActiveRecord::Migration[6.0]
  def change
    add_column :repeats, :alive, :boolean
  end
end
