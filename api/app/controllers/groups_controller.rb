class GroupsController < ApplicationController
  def index
    tournament = Tournament.first
    @groups = tournament.groups.includes(groups_teams: { team: [attacker: :player, defender: :player] })
  end
end
