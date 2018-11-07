class GroupsController < ApplicationController
  def index
    tournament = Tournament.first
    @groups = tournament.groups.includes(groups_teams: { team: %i[attacker defender] })
  end
end
