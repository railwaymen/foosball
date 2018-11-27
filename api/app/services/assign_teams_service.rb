# frozen_string_literal: true

class AssignTeamsService
  attr_reader :tournament

  def initialize(tournament)
    @tournament = tournament
  end

  def call
    attackers, defenders = tournament.tournament_players.order(Arel.sql('RANDOM()'))
                                     .partition(&:attacker?)

    attackers.zip(defenders).map do |attacker, defender|
      tournament.teams.create!(attacker: attacker.player, defender: defender.player)
    end
  end
end
