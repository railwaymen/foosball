require 'rails_helper'

RSpec.describe GamesPlayer, type: :model do
  it { is_expected.to validate_presence_of(:team) }
  it { is_expected.to validate_presence_of(:position) }
  it { is_expected.to validate_presence_of(:gols) }
  it { is_expected.to validate_presence_of(:own_gols) }

  it { should validate_numericality_of(:gols).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:own_gols).is_greater_than_or_equal_to(0) }
end
