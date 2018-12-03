# frozen_string_literal: true

class Tournament < ApplicationRecord
  has_many :tournament_players, dependent: :destroy
  has_many :teams, dependent: :destroy
  has_many :groups, dependent: :destroy

  has_many :players, through: :tournament_players

  validates :name, presence: true
end
