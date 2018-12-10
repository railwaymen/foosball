# frozen_string_literal: true

json.array! @players do |player|
  json.id player.id
  json.first_name player.first_name
  json.last_name player.last_name
  json.email player.email
  json.elo_rating player.elo_rating
  json.elo_rating_defender player.elo_rating_defender
  json.elo_rating_attacker player.elo_rating_attacker
end
