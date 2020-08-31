class AddMonthNumToMonth < ActiveRecord::Migration[6.0]
  def change
    add_column :months, :month_num, :int
  end
end
