class AddNameToTournament < ActiveRecord::Migration[5.2]
  def change
    add_column :tournaments, :name, :string, default: ''
  end
end
