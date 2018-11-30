# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GroupsController, type: :controller do
  let(:tournament) { create(:tournament) }

  describe 'GET #index' do
    it 'returns http 401 when missing token' do
      get :index, format: :json, params: { tournament_id: tournament.id }
      expect(response).to have_http_status(401)
    end

    it 'returns http 401 when expired token' do
      exired_http_login
      get :index, format: :json, params: { tournament_id: tournament.id }
      expect(response).to have_http_status(401)
    end

    it 'returns empty array' do
      http_login
      get :index, format: :json, params: { tournament_id: tournament.id }
      expect(response).to have_http_status(:success)
      expect(response.body).to be_json_eql([])
    end

    it 'returns players in proper order' do
      player1 = create(:player, first_name: 'First 1', last_name: 'Last 1', email: 'example1@email.com')
      player2 = create(:player, first_name: 'First 2', last_name: 'Last 2', email: 'example2@email.com')
      group = create(:group, tournament: tournament)
      team = create(:team, tournament: tournament, attacker: player1, defender: player2)
      create(:groups_team, group: group, team: team)

      http_login
      get :index, format: :json, params: { tournament_id: tournament.id }
      expect(response).to have_http_status(:success)
      expect(response.body).to be_json_eql([
        name: 'Name 1',
        teams: [
          {
            'attacker_first_name': 'First 1',
            'attacker_id': player1.id,
            'attacker_last_name': 'Last 1',
            'defender_first_name': 'First 2',
            'defender_id': player2.id,
            'defender_last_name': 'Last 2',
            'goal_difference': 0,
            'goals_against': 0,
            'goals_for': 0,
            'played': 0,
            'points': 0
          }
        ],
        'tournament_id': tournament.id
      ].to_json)
    end
  end
end
