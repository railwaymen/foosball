# frozen_string_literal: true

json.array! @players do |player|
  json.id player.id
  json.first_name player.first_name
  json.last_name player.last_name
  json.email player.email
end
