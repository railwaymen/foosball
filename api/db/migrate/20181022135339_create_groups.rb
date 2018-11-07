class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.belongs_to :tournament, foreign_key: true, null: false
      t.string :name, null: false
      t.timestamps null: false
    end

    add_index :groups, %i[name tournament_id], unique: true
  end
end
