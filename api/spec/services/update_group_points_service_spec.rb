# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UpdateGroupPointsService do
  describe '#call' do
    it 'updates groups' do
      group = FactoryBot.create :group
      game = FactoryBot.create :game, group: group, red_score: 7, blue_score: 5
      red_team = FactoryBot.create :team, attacker: game.red_attacker, defender: game.red_defender,
                                          tournament: group.tournament
      blue_team = FactoryBot.create :team, attacker: game.blue_attacker, defender: game.blue_defender,
                                           tournament: group.tournament
      red_groups_team = FactoryBot.create :groups_team, group: group, team: red_team
      blue_groups_team = FactoryBot.create :groups_team, group: group, team: blue_team

      UpdateGroupPointsService.new(game).call

      expect(red_groups_team.reload.played).to eq(1)
      expect(blue_groups_team.reload.played).to eq(1)

      expect(red_groups_team.points).to eq(1)
      expect(blue_groups_team.points).to eq(0)

      expect(red_groups_team.goal_difference).to eq(2)
      expect(blue_groups_team.goal_difference).to eq(-2)

      expect(red_groups_team.goals_against).to eq(5)
      expect(blue_groups_team.goals_against).to eq(7)

      expect(red_groups_team.goals_for).to eq(7)
      expect(blue_groups_team.goals_for).to eq(5)
    end
  end
end
