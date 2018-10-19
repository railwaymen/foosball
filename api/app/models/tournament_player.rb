class TournamentPlayer < ApplicationRecord
  enum position: { attacker: 'attacker', defender: 'defender' }

  belongs_to :player
  belongs_to :tournament

  validates :player_id, presence: true, uniqueness: { scope: [:tournament_id] }
  validates :tournament_id, presence: true
end
