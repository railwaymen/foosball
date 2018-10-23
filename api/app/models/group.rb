class Group < ApplicationRecord
  belongs_to :tournament

  has_many :groups_teams, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: [:tournament_id] }
end
