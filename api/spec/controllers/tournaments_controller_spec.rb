# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TournamentsController, type: :controller do
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

    it 'returns tournaments' do
      first = create(:tournament)
      second = create(:tournament)

      http_login
      get :index, format: :json
      expect(response).to have_http_status(:success)
      expect(response.body).to be_json_eql([
        {
          name: first.name,
          id: first.id
        },
        {
          name: second.name,
          id: second.id
        }
      ].to_json)
    end
  end

  describe 'PUT #create' do
    it 'returns http 401 when missing token' do
      put :create, format: :json, params: { tournament: nil }
      expect(response).to have_http_status(401)
    end

    it 'returns http 401 when expired token' do
      exired_http_login
      put :create, format: :json, params: { tournament: nil }
      expect(response).to have_http_status(401)
    end

    it 'creates game' do
      additional_params = { attackers: (1..4).map(&:to_s), defenders: (1..4).map(&:to_s) }
      params = attributes_for(:tournament).merge(additional_params)

      http_login
      tournament_service_double = double
      allow(PrepareTournamentService).to receive(:new) { tournament_service_double }
      allow(tournament_service_double).to receive(:call)

      put :create, format: :json, params: { tournament: params }

      expect(response).to have_http_status(200)
      expect(PrepareTournamentService).to have_received(:new).with(
        tournament: Tournament.last,
        attacker_ids: additional_params[:attackers],
        defender_ids: additional_params[:defenders]
      )
      expect(tournament_service_double).to have_received(:call)
      expect(Tournament.count).to eq(1)
    end
  end
end
