class TournamentPlayer < ApplicationRecord
  enum position: { attacker: 'attacker', defender: 'defender' }

  belongs_to :player
  belongs_to :tournament

  validates :player_id, uniqueness: { scope: [:tournament_id] }
end
