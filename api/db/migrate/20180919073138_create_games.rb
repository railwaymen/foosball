class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.belongs_to :red_attacker, foreign_key: { to_table: :players }, null: false
      t.belongs_to :red_defender, foreign_key: { to_table: :players }, null: false
      t.belongs_to :blue_attacker, foreign_key: { to_table: :players }, null: false
      t.belongs_to :blue_defender, foreign_key: { to_table: :players }, null: false
      t.integer :red_score, null: false
      t.integer :blue_score, null: false

      t.timestamps
    end
  end
end
