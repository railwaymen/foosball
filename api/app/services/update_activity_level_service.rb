class UpdateActivityLevelService
  def call
    Player.all.each do |player|
      set_activity_level(player)
    end
  end

  private

  def set_activity_level(player)
    games_count = player.games_players.where('created_at > ?', 1.month.ago).count
    activity_level = games_count > 0 ? Math.log10(games_count).floor : 0
    player.update activity_level: activity_level
  end
end
