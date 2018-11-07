require 'rails_helper'

RSpec.describe AssignTeamsService do
  describe '#call' do
    let(:tournament) { Tournament.create! }
    let(:teams_count) { 4 }

    before do
      (1..teams_count).each do |i|
        attacker = Player.create!(first_name: "Attacker#{i}", last_name: 'Nowak', email: "attacker_#{i}@example.com")
        tournament.tournament_players.create!(player: attacker, position: :attacker)
        defender = Player.create!(first_name: "Attacker#{i}", last_name: 'Nowak', email: "attacker_#{i}@example.com")
        tournament.tournament_players.create!(player: defender, position: :defender)
      end
    end

    it 'create teams' do
      expect do
        described_class.new(tournament).call
      end.to change(tournament.teams, :count).by(teams_count)
    end
  end
end
