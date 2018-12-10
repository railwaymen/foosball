# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PlayersController, type: :controller do
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
      create(:player, first_name: 'C', last_name: 'A', activity_level: 2, email: 'example.ca2@email.com')
      create(:player, first_name: 'B', last_name: 'W', activity_level: 1, email: 'example.bw1@email.com')
      create(:player, first_name: 'B', last_name: 'W', activity_level: 2, email: 'example.bw2@email.com')
      create(:player, first_name: 'C', last_name: 'K', activity_level: 1, email: 'example.ck1@email.com')
      create(:player, first_name: 'C', last_name: 'B', activity_level: 2, email: 'example.cb2@email.com')
      create(:player, first_name: 'C', last_name: 'A', activity_level: 1, email: 'example.ca1@email.com')

      http_login
      get :index, format: :json
      expect(response).to have_http_status(:success)
      expect(response.body).to be_json_eql([
        {
          "elo_rating": 1200,
          "elo_rating_attacker": 1200,
          "elo_rating_defender": 1200,
          "email": 'example.bw2@email.com',
          "first_name": 'B',
          "last_name": 'W'
        },
        {
          "elo_rating": 1200,
          "elo_rating_attacker": 1200,
          "elo_rating_defender": 1200,
          "email": 'example.ca2@email.com',
          "first_name": 'C',
          "last_name": 'A'
        },
        {
          "elo_rating": 1200,
          "elo_rating_attacker": 1200,
          "elo_rating_defender": 1200,
          "email": 'example.cb2@email.com',
          "first_name": 'C',
          "last_name": 'B'
        },
        {
          "elo_rating": 1200,
          "elo_rating_attacker": 1200,
          "elo_rating_defender": 1200,
          "email": 'example.bw1@email.com',
          "first_name": 'B',
          "last_name": 'W'
        },
        {
          "elo_rating": 1200,
          "elo_rating_attacker": 1200,
          "elo_rating_defender": 1200,
          "email": 'example.ca1@email.com',
          "first_name": 'C',
          "last_name": 'A'
        },
        {
          "elo_rating": 1200,
          "elo_rating_attacker": 1200,
          "elo_rating_defender": 1200,
          "email": 'example.ck1@email.com',
          "first_name": 'C',
          "last_name": 'K'
        }
      ].to_json)
    end
  end
end
