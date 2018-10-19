class CreateTournamentPlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :tournament_players do |t|
      t.belongs_to :player, foreign_key: true, null: false
      t.belongs_to :tournament, foreign_key: true, null: false
      t.string :position, null: false

      t.timestamps
    end
    add_index :tournament_players, [:player_id, :tournament_id], unique: true
  end
end
