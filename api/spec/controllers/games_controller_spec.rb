# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GamesController, type: :controller do
  describe 'GET #index' do
    it 'returns http 401 when missing token' do
      put :create, format: :json, params: { games: nil }
      expect(response).to have_http_status(401)
    end

    it 'returns http 401 when expired token' do
      exired_http_login
      put :create, format: :json, params: { games: nil }
      expect(response).to have_http_status(401)
    end

    it 'creates game' do
      player1 = FactoryBot.create :player
      player2 = FactoryBot.create :player
      player3 = FactoryBot.create :player
      player4 = FactoryBot.create :player
      params = {
        blue_attacker_id: player2.id, blue_defender_id: player1.id, blue_score: 10,
        red_attacker_id: player4.id, red_defender_id: player3.id, red_score: 7,
        started_at: '2018-11-28T16:24:38', finished_at: '2018-11-28T16:25:03',
        games_players_attributes: [
          { gols: 4, own_gols: 1, player_id: player1.id, position: 'defender', team: 'blue' },
          { gols: 3, own_gols: 1, player_id: player2.id, position: 'attacker', team: 'blue' },
          { gols: 2, own_gols: 2, player_id: player3.id, position: 'defender', team: 'red' },
          { gols: 3, own_gols: 1, player_id: player4.id, position: 'attacker', team: 'red' }
        ]
      }

      http_login
      put :create, format: :json, params: { games: params }
      expect(response).to have_http_status(200)

      expect(Game.count).to eq(1)
      expect(GamesPlayer.count).to eq(4)
    end
  end
end
