class CreateRepeats < ActiveRecord::Migration[6.0]
  def change
    create_table :repeats do |t|

      t.timestamps
    end
  end
end
