class GamesPlayer < ApplicationRecord
  belongs_to :game
  belongs_to :player

  validates :team, :position, :gols, :own_gols, presence: true
  validates :gols, numericality: { greater_than_or_equal_to: 0 }
  validates :own_gols, numericality: { greater_than_or_equal_to: 0 }
end
