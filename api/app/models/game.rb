class Game < ApplicationRecord
  belongs_to :red_attacker, class_name: 'Player'
  belongs_to :red_defender, class_name: 'Player'
  belongs_to :blue_attacker, class_name: 'Player'
  belongs_to :blue_defender, class_name: 'Player'
end
