# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GamesController, type: :controller do
  describe 'GET #index' do
    it 'returns http 401 when missing token' do
      get :index, format: :json
      expect(response).to have_http_status(401)
    end

    it 'returns http 401 when expired token' do
      exired_http_login
      get :index, format: :json
      expect(response).to have_http_status(401)
    end

    it 'returns empty array' do
      http_login
      get :index, format: :json
      expect(response).to have_http_status(:success)
      expect(response.body).to be_json_eql([])
    end

    it 'returns players in proper order' do
      player1 = create(:player, first_name: 'First 1', last_name: 'Last 1', email: 'example1@email.com')
      player2 = create(:player, first_name: 'First 2', last_name: 'Last 2', email: 'example2@email.com')
      player3 = create(:player, first_name: 'First 3', last_name: 'Last 3', email: 'example3@email.com')
      player4 = create(:player, first_name: 'First 4', last_name: 'Last 4', email: 'example4@email.com')
      game = create(:game, :with_games_players, red_attacker: player1, red_defender: player2, blue_attacker: player3,
                                                blue_defender: player4)

      http_login
      get :index, format: :json
      expect(response).to have_http_status(:success)
      expect(response.body).to be_json_eql([
        blue_score: 8,
        red_score: 10,
        id: game.id,
        created_at: game.created_at,
        players: [
          {
            email: 'example1@email.com',
            first_name: 'First 1',
            goals: 5,
            last_name: 'Last 1',
            own_goals: 0,
            position: 'attaker',
            team: 'red'
          },
          {
            email: 'example2@email.com',
            first_name: 'First 2',
            goals: 5,
            last_name: 'Last 2',
            own_goals: 0,
            position: 'defender',
            team: 'red'
          },
          {
            email: 'example3@email.com',
            first_name: 'First 3',
            goals: 4,
            last_name: 'Last 3',
            own_goals: 0,
            position: 'attaker',
            team: 'blue'
          },
          {
            email: 'example4@email.com',
            first_name: 'First 4',
            goals: 4,
            last_name: 'Last 4',
            own_goals: 0,
            position: 'defender',
            team: 'blue'
          }
        ]
      ].to_json)
    end
  end

  describe 'PUT #create' do
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
          { goals: 4, own_goals: 1, player_id: player1.id, position: 'defender', team: 'blue' },
          { goals: 3, own_goals: 1, player_id: player2.id, position: 'attacker', team: 'blue' },
          { goals: 2, own_goals: 2, player_id: player3.id, position: 'defender', team: 'red' },
          { goals: 3, own_goals: 1, player_id: player4.id, position: 'attacker', team: 'red' }
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
