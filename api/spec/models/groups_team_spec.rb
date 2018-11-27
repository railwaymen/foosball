# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GroupsTeam, type: :model do
  it { should validate_numericality_of(:points).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:goals_against).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:goals_for).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:played).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:goal_difference) }
end
