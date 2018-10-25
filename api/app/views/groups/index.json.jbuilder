json.array! @groups do |group|
  json.extract! group, :id, :tournament_id, :name
  json.teams group.groups_teams do |groups_team|
    json.extract! groups_team, :points, :goal_difference, :goals_against, :goals_for, :played
    json.id groups_team.team.id
    json.attacker_id groups_team.team.attacker.player_id
    json.attacker_first_name groups_team.team.attacker.player.first_name
    json.attacker_last_name groups_team.team.attacker.player.last_name
    json.defender_id groups_team.team.defender.player_id
    json.defender_first_name groups_team.team.defender.player.first_name
    json.defender_last_name groups_team.team.defender.player.last_name
  end
end
