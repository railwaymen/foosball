class TournamentPlayer < ApplicationRecord
  enum position: Hash[%w[no_preference attacker defender].map { |key| [key, key] }]

  belongs_to :player
  belongs_to :tournament

  validates :player_id, uniqueness: { scope: [:tournament_id] }
end
