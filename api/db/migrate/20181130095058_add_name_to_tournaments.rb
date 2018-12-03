class AddNameToTournaments < ActiveRecord::Migration[5.2]
  def up
    add_column :tournaments, :name, :string
    Tournament.find_each do |tournament|
      tournament.update(name: "Tournament ##{tournament.id}")
    end
    change_column :tournaments, :name, :string, null: false
  end

  def down
    remove_column :tournaments, :name, :string
  end
end
