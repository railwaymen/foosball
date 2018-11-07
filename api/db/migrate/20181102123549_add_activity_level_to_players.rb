class AddActivityLevelToPlayers < ActiveRecord::Migration[5.2]
  def up
    add_column :players, :activity_level, :integer, null: false, default: 0
    UpdateActivityLevelService.new.all
  end

  def down
    remove_column :players, :activity_level
  end
end
