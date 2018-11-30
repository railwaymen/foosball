# frozen_string_literal: true

json.array! @games do |game|
  json.extract! game, :id, :red_score, :blue_score, :created_at
  json.players game.games_players do |games_player|
    json.extract! games_player, :team, :position, :gols, :own_gols
    json.extract! games_player.player, :first_name, :last_name, :email, :id
  end
end
