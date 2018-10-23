class GroupsController < ApplicationController
  def index
    tournament = Tournament.find(params[:tournament_id])
    @groups = tournament.groups.includes(groups_teams: { team: [attacker: :player, defender: :player] })
  end
end