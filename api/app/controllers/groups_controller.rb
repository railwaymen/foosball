# frozen_string_literal: true

class GroupsController < ApplicationController
  def index
    tournament = Tournament.find(params[:tournament_id])
    @groups = tournament.groups.includes(groups_teams: { team: %i[attacker defender] })
  end
end
