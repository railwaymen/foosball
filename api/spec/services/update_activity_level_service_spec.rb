# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UpdateActivityLevelService do
  describe '#call' do
    it 'updates activity_level' do
      stub_const('UpdateActivityLevelService::LOG_BASE', 2)
      player1 = FactoryBot.create(:player)
      player2 = FactoryBot.create(:player)
      player3 = FactoryBot.create(:player)
      FactoryBot.create_list(:games_player, 1, player: player1)
      FactoryBot.create_list(:games_player, 2, player: player2)
      FactoryBot.create_list(:games_player, 4, player: player3)

      UpdateActivityLevelService.new.call

      expect(player1.reload.activity_level).to eq(0)
      expect(player2.reload.activity_level).to eq(1)
      expect(player3.reload.activity_level).to eq(2)
    end
  end
end
