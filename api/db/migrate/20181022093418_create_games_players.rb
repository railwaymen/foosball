class CreateGamesPlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :games_players do |t|
      t.belongs_to :player, null: false
      t.belongs_to :game, null: false
      t.string :team, null: false
      t.string :position, null: false
      t.integer :gols, null: false
      t.integer :own_gols, null: false
      t.timestamps null: false
    end
  end
end
