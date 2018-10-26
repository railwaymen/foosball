class UpdateGroupPointsService
  GAME_UP_TO = 7

  def initialize(game)
    @game = game
    @group = @game.group
    raise 'No group' if @group.nil?
  end

  def call
    red_groups_team = @group.groups_teams.joins(:team)
      .find_by(teams: { attacker_id: @game.red_attacker_id, defender_id: @game.red_defender_id })
    blue_groups_team = @group.groups_teams.joins(:team)
      .find_by(teams: { attacker_id: @game.blue_attacker_id, defender_id: @game.blue_defender_id })
    update_groups_teams(red_groups_team, 'red')
    update_groups_teams(blue_groups_team, 'blue')
  end

  private

  def update_groups_teams(team, color)
    winner = color == 'red' ? @game.red_score == GAME_UP_TO : @game.blue_score == GAME_UP_TO
    team.points += 1 if winner
    team.goal_difference += (color == 'red' ? @game.red_score - @game.blue_score : @game.blue_score - @game.red_score)
    team.goals_against += (color == 'red' ? @game.blue_score : @game.red_score)
    team.goals_for += (color == 'red' ? @game.red_score : @game.blue_score)
    team.played += 1
    team.save!
  end
end
