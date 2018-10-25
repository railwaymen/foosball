class GroupsTeam < ApplicationRecord
  belongs_to :group
  belongs_to :team

  validates :points, :goal_difference, :goals_against, :goals_for, :played, numericality: { greater_than_or_equal_to: 0 }
end
