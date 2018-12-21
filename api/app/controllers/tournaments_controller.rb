# frozen_string_literal: true

class TournamentsController < ApplicationController
  def index
    @tournaments = Tournament.all
  end

  def create
    @tournament = Tournament.create(tournament_params)
    respond_with @tournament
  end

  private

  def tournament_params
    params.require(:tournament).permit(:name)
  end
end
