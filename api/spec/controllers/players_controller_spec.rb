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
      create(:player, first_name: 'C', last_name: 'A', activity_level: 2)
      create(:player, first_name: 'B', last_name: 'W', activity_level: 1)
      create(:player, first_name: 'B', last_name: 'W', activity_level: 2)
      create(:player, first_name: 'C', last_name: 'K', activity_level: 1)
      create(:player, first_name: 'C', last_name: 'B', activity_level: 2)
      create(:player, first_name: 'C', last_name: 'A', activity_level: 1)

      http_login
      get :index, format: :json
      expect(response).to have_http_status(:success)
      expect(response.body).to be_json_eql([
        {
          "email": 'example3@email.com',
          "first_name": 'B',
          "last_name": 'W'
        },
        {
          "email": 'example1@email.com',
          "first_name": 'C',
          "last_name": 'A'
        },
        {
          "email": 'example5@email.com',
          "first_name": 'C',
          "last_name": 'B'
        },
        {
          "email": 'example2@email.com',
          "first_name": 'B',
          "last_name": 'W'
        },
        {
          "email": 'example6@email.com',
          "first_name": 'C',
          "last_name": 'A'
        },
        {
          "email": 'example4@email.com',
          "first_name": 'C',
          "last_name": 'K'
        }
      ].to_json)
    end
  end
end
