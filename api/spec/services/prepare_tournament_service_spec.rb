# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PrepareTournamentService do
  describe '#call' do
    let(:tournament) { create(:tournament) }
    let(:teams_count) { 4 }
    let(:defender_ids) do
      (1..teams_count).map { |i| Player.create!(first_name: "Defender#{i}", last_name: 'Nowak', email: "defender#{i}@example.com").id }
    end
    let(:attacker_ids) do
      (1..teams_count).map { |i| Player.create!(first_name: "Attacker#{i}", last_name: 'Nowak', email: "attacker_#{i}@example.com").id }
    end

    it 'create teams' do
      expect do
        described_class.new(tournament: tournament, defender_ids: defender_ids, attacker_ids: attacker_ids).call
      end.to change(tournament.teams, :count).by(teams_count)
    end
  end
end
