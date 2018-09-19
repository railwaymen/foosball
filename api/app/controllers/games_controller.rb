class GamesController < ApplicationController
  def create
    @game = Game.new(game_params)
    @game.save
    respond_with @game
  end

  private

  def game_params
    params.require(:games).permit(:red_attacker_id, :red_defender_id, :blue_attacker_id, :blue_defender_id, :red_score, :blue_score)
  end
end
