class ChangeTeamsRelation < ActiveRecord::Migration[5.2]
  def up
    remove_column :teams, :attacker_id
    remove_column :teams, :defender_id

    add_reference :teams, :attacker, foreign_key: { to_table: :players }
    add_reference :teams, :defender, foreign_key: { to_table: :players }
  end


  def down
    remove_column :teams, :attacker_id
    remove_column :teams, :defender_id

    add_reference :teams, :attacker, foreign_key: { to_table: :tournament_players }
    add_reference :teams, :defender, foreign_key: { to_table: :tournament_players }
  end
end
