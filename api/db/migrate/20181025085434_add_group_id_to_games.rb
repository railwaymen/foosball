class AddGroupIdToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :group_id, :integer, null: true

    add_index :games, :group_id
  end
end
