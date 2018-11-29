# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CreateGroupsService do
  describe '#call' do
    it 'raises error when amount is Incorrect' do
      tournament = FactoryBot.create :tournament
      teams = FactoryBot.create_list :team, 4, tournament: tournament

      aggregate_failures 'groups' do
        expect do
          CreateGroupsService.new(tournament, 1).call
        end.to raise_error('Incorrect amount')
        expect do
          CreateGroupsService.new(tournament, 9).call
        end.to raise_error('Incorrect amount')
      end

      aggregate_failures 'groups' do
        CreateGroupsService.new(tournament, 2).call
        expect(tournament.groups.count).to eq(2)
        expect(tournament.groups.pluck(:name)).to match_array(%w[A B])
      end

      aggregate_failures 'team' do
        expect(GroupsTeam.count).to eq(4)
        expect(tournament.groups[0].groups_teams.count).to eq(2)
        expect(tournament.groups[1].groups_teams.count).to eq(2)
        expect(GroupsTeam.all.pluck(:team_id)).to match_array(teams.pluck(:id))
      end
    end

    it 'calculate_amount_in_groups' do
      tournament = FactoryBot.create :tournament
      instance = CreateGroupsService.new(tournament, 2)

      expect(instance.send(:calculate_amount_in_groups, 5, 2)).to eq([2, 3])
      expect(instance.send(:calculate_amount_in_groups, 5, 3)).to eq([1, 2, 2])
      expect(instance.send(:calculate_amount_in_groups, 5, 4)).to eq([1, 1, 1, 2])

      expect(instance.send(:calculate_amount_in_groups, 10, 2)).to eq([5, 5])
      expect(instance.send(:calculate_amount_in_groups, 10, 3)).to eq([3, 3, 4])
      expect(instance.send(:calculate_amount_in_groups, 10, 4)).to eq([2, 2, 3, 3])
    end
  end
end
