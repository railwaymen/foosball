class TypoFix < ActiveRecord::Migration[5.2]
  def change
    rename_column :games_players, :gols, :goals
    rename_column :games_players, :own_gols, :own_goals
  end
end
