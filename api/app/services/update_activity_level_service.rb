# frozen_string_literal: true

class UpdateActivityLevelService
  def call
    Player.all.each do |player|
      update_activity_level_for(player)
    end
  end

  private

  def update_activity_level_for(player)
    games_count = player.games_players.where('created_at > ?', 1.month.ago).count
    activity_level = games_count.positive? ? Math.log10(games_count).floor : 0
    player.update activity_level: activity_level
  end
end
