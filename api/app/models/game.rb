class Game < ApplicationRecord
  belongs_to :red_attacker, class_name: 'Player'
  belongs_to :red_defender, class_name: 'Player'
  belongs_to :blue_attacker, class_name: 'Player'
  belongs_to :blue_defender, class_name: 'Player'
  belongs_to :group, optional: true

  has_many :games_players, dependent: :destroy

  accepts_nested_attributes_for :games_players, reject_if: :all_blank
end
