# frozen_string_literal: true

json.array! @tournaments do |tournament|
  json.id tournament.id
  json.name tournament.name
end
