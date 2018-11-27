require 'rails_helper'

RSpec.describe RatingService do
  describe '#call' do
    let(:red_attacker) { Player.create!(first_name: 'RedAttacker', last_name: 'Nowak', email: 'attacker_red@example.com') }
    let(:red_defender) { Player.create!(first_name: 'RedDefender', last_name: 'Nowak', email: 'defender_red@example.com') }
    let(:blue_attacker) { Player.create!(first_name: 'BlueAttacker', last_name: 'Nowak', email: 'attacker_blue@example.com') }
    let(:blue_defender) { Player.create!(first_name: 'BlueDefender', last_name: 'Nowak', email: 'defender_blue@example.com') }
    let(:game) do
      Game.create(
        red_attacker: red_attacker,
        red_defender: red_defender,
        blue_attacker: blue_attacker,
        blue_defender: blue_defender,
        red_score: 10,
        blue_score: 1
      )
    end

    it 'updates ratings' do
      expect do
        4.times { described_class.new(game).call }
      end.to change(red_attacker, :elo_rating).by(80) &
             change(blue_attacker, :elo_rating).by(-80) &
             change(blue_attacker, :elo_rating_defender).by(0) &
             change(blue_defender, :elo_rating_defender).by(-80)
    end
  end
end
