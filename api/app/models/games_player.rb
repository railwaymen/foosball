# frozen_string_literal: true

class GamesPlayer < ApplicationRecord
  belongs_to :game
  belongs_to :player

  validates :team, :position, :goals, :own_goals, presence: true
  validates :goals, numericality: { greater_than_or_equal_to: 0 }
  validates :own_goals, numericality: { greater_than_or_equal_to: 0 }
end
