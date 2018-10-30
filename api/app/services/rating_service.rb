class RatingService
  RATING_CHANGE = 25

  def initialize(game)
    @game = game
  end

  def call
    calculate_ratings
    calculate_position_ratings
  end

  private

  def calculate_ratings
    [@game.red_attacker, @game.red_defender].each { |player| player.update!(elo_rating: new_red_elo_rating(player)) }
    [@game.blue_attacker, @game.blue_defender].each { |player| player.update!(elo_rating: new_blue_elo_rating(player)) }
  end

  def calculate_position_ratings
    @game.red_attacker.update!(elo_rating_attacker: new_red_position_elo_rating(@game.red_attacker.elo_rating_attacker))
    @game.red_defender.update!(elo_rating_defender: new_red_position_elo_rating(@game.red_defender.elo_rating_defender))
    @game.blue_attacker.update!(elo_rating_attacker: new_blue_position_elo_rating(@game.blue_attacker.elo_rating_attacker))
    @game.blue_defender.update!(elo_rating_defender: new_blue_position_elo_rating(@game.blue_defender.elo_rating_defender))
  end

  def new_red_elo_rating(player)
    diff_outcome_esp = outcome('red') - expected_player_score(blue_average_rating, red_average_rating)
    new_elo_rating(player.elo_rating, diff_outcome_esp)
  end

  def new_blue_elo_rating(player)
    diff_outcome_esp = outcome('blue') - expected_player_score(red_average_rating, blue_average_rating)
    new_elo_rating(player.elo_rating, diff_outcome_esp)
  end

  def new_red_position_elo_rating(position_elo_rating)
    diff_outcome_esp = outcome('red') - expected_player_score(blue_average_position_rating, red_average_position_rating)
    new_elo_rating(position_elo_rating, diff_outcome_esp)
  end

  def new_blue_position_elo_rating(position_elo_rating)
    diff_outcome_esp = outcome('blue') - expected_player_score(red_average_position_rating, blue_average_position_rating)
    new_elo_rating(position_elo_rating, diff_outcome_esp)
  end

  def new_elo_rating(old_elo_rating, diff_outcome_esp)
    old_elo_rating + (RATING_CHANGE * diff_outcome_esp).to_i
  end

  def red_average_rating
    @red_average_rating ||= BigDecimal.new(@game.red_attacker.elo_rating + @game.red_defender.elo_rating) / 2
  end

  def blue_average_rating
    @blue_average_rating ||= BigDecimal.new(@game.blue_attacker.elo_rating + @game.blue_defender.elo_rating) / 2
  end

  def red_average_position_rating
    @red_average_position_rating ||= BigDecimal.new(@game.red_attacker.elo_rating_attacker + @game.red_defender.elo_rating_defender) / 2
  end

  def blue_average_position_rating
    @blue_average_position_rating ||= BigDecimal.new(@game.blue_attacker.elo_rating_attacker + @game.blue_defender.elo_rating_defender) / 2
  end

  def expected_player_score(a, b)
    1 / (1 + 10.pow(((a - b) / 400))) * 2
  end

  def out(team)
    if @game.red_score > @game.blue_score
      team == 'red' ? 1 : -1
    else
      team == 'blue' ? 1 : -1
    end
  end

  def outcome(team)
    if @game.red_score > @game.blue_score
      team == 'red' ? 2 : 0
    else
      team == 'blue' ? 2 : 0
    end
  end
end
