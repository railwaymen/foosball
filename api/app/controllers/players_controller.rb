# frozen_string_literal: true

class PlayersController < ApplicationController
  def index
    @players = Player.all.order(activity_level: :desc, first_name: :asc, last_name: :asc)
  end
end
