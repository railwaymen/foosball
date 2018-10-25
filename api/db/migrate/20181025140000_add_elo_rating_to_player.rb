class AddEloRatingToPlayer < ActiveRecord::Migration[5.2]
  def change
    add_column :players, :elo_rating, :integer, null: false, default: 1200
    add_column :players, :elo_rating_defender, :integer, null: false, default: 1200
    add_column :players, :elo_rating_attacker, :integer, null: false, default: 1200
  end
end
