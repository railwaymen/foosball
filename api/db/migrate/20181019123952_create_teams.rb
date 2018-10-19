class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.belongs_to :tournament, foreign_key: true, null: false
      t.belongs_to :attacker, foreign_key: { to_table: :tournament_players }
      t.belongs_to :defender, foreign_key: { to_table: :tournament_players }
      t.timestamps
    end
  end
end
