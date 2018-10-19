class Team < ApplicationRecord
  belongs_to :tournament
  belongs_to :attacker, class_name: 'TournamentPlayer'
  belongs_to :defender, class_name: 'TournamentPlayer'
end
