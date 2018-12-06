# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GamesPlayer, type: :model do
  it { is_expected.to validate_presence_of(:team) }
  it { is_expected.to validate_presence_of(:position) }
  it { is_expected.to validate_presence_of(:goals) }
  it { is_expected.to validate_presence_of(:own_goals) }

  it { should validate_numericality_of(:goals).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:own_goals).is_greater_than_or_equal_to(0) }
end
