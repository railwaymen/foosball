class CreateGroupsTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :groups_teams do |t|
      t.belongs_to :team, foreign_key: true, null: false
      t.belongs_to :group, foreign_key: true, null: false
      t.integer :points, null: false, default: 0
      t.integer :goal_difference, null: false, default: 0
      t.integer :goals_against, null: false, default: 0
      t.integer :goals_for, null: false, default: 0
      t.integer :played, null: false, default: 0
      t.timestamps null: false
    end
  end
end
