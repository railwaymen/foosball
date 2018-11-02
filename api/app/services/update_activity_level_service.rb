class UpdateActivityLevelService
  def call
    ActiveRecord::Base.connection.execute(update_activity_level_query)
  end

  private

  def update_activity_level_query
    <<-SQL
      UPDATE players
      SET activity_level =
        (SELECT count(1)
         FROM games_players
         WHERE player_id = players.id)
    SQL
  end
end
