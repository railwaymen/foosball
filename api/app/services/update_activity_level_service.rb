# frozen_string_literal: true

class UpdateActivityLevelService
  LOG_BASE = 10
  def call
    Player.all.each do |player|
      update_activity_level_for(player)
    end
  end

  private

  def update_activity_level_for(player)
    games_count = player.games_players.where('created_at > ?', 1.month.ago).count
    activity_level = games_count.positive? ? Math.log(games_count, LOG_BASE).floor : 0
    player.update activity_level: activity_level
  end
end
