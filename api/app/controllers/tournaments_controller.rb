# frozen_string_literal: true

class TournamentsController < ApplicationController
  def index
    @tournaments = Tournament.all
  end

  def create
    @tournament = Tournament.new(tournament_params)
    if @tournament.save
      PrepareTournamentService.new(
        tournament: @tournament,
        defender_ids: params.dig(:tournament, :defenders) || [],
        attacker_ids: params.dig(:tournament, :attackers) || []
      ).call
    end
    respond_with @tournament
  end

  private

  def tournament_params
    params.require(:tournament).permit(:name)
  end
end
