# frozen_string_literal: true

class PrepareTournamentService
  def initialize(tournament:, defender_ids:, attacker_ids:)
    @tournament = tournament
    @defender_ids = defender_ids
    @attacker_ids = attacker_ids
  end

  def call
    create_players
    assign_teams
  end

  private

  def create_players
    create_block = ->(position, id) { @tournament.tournament_players.create!(player_id: id, position: position) }.curry
    @defenders = @defender_ids.map(&create_block.call(:defender))
    @attackers = @attacker_ids.map(&create_block.call(:attacker))
  end

  def assign_teams
    @attackers.shuffle.zip(@defenders) do |attacker, defender|
      @tournament.teams.create!(attacker_id: attacker.player_id, defender_id: defender.player_id)
    end
  end
end
