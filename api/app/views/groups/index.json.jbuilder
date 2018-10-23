json.array! @groups do |group|
  json.extract! group, :id, :tournament_id, :name
  json.teams group.groups_teams do |groups_team|
    json.extract! groups_team, :points, :goal_difference, :goals_against, :goals_for
    json.attacker_id groups_team.team.attacker.player_id
    json.attacker_name groups_team.team.attacker.player.to_s
    json.defender_id groups_team.team.defender.player_id
    json.defender_name groups_team.team.defender.player.to_s
  end
end
