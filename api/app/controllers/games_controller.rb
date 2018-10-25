class GamesController < ApplicationController
  def create
    @game = Game.create!(game_params)
    UpdateGroupPointsService.new(@game).call if @game.group_id.present?
    RatingService.new(@game).call
    respond_with @game
  end

  private

  def game_params
    params.require(:games).permit(:red_attacker_id, :red_defender_id, :blue_attacker_id, :blue_defender_id, :red_score,
                                  :blue_score, :started_at, :finished_at, :group_id,
                                  games_players_attributes: %i[id player_id team position gols own_gols])
  end
end
