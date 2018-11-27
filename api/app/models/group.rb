# frozen_string_literal: true

class Group < ApplicationRecord
  belongs_to :tournament

  has_many :groups_teams, -> { order(points: :desc, goal_difference: :desc) }, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: [:tournament_id] }
end
