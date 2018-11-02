class PlayersController < ApplicationController
  def index
    @players = Player.all.order(activity_level: :desc)
  end
end
