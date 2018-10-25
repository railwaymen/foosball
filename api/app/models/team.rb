class Team < ApplicationRecord
  belongs_to :tournament
  belongs_to :attacker, class_name: 'Player'
  belongs_to :defender, class_name: 'Player'
end
