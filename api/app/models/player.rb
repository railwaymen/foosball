# frozen_string_literal: true

class Player < ApplicationRecord
  has_many :games_players, dependent: :destroy

  validates :first_name, :last_name, :email, :elo_rating, :elo_rating_defender, :elo_rating_attacker, presence: true
end
