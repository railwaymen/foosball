# frozen_string_literal: true

FactoryBot.define do
  factory :game do
    red_score { 10 }
    blue_score { 8 }

    after :build do |record|
      record.red_attacker ||= FactoryBot.create :player
      record.red_defender ||= FactoryBot.create :player
      record.blue_attacker ||= FactoryBot.create :player
      record.blue_defender ||= FactoryBot.create :player
    end

    trait :with_games_players do
      after :build do |record|
        FactoryBot.create :games_player, game: record, player: record.red_attacker, position: 'attaker', team: 'red',
                                         goals: 5, own_goals: 0
        FactoryBot.create :games_player, game: record, player: record.red_defender, position: 'defender', team: 'red',
                                         goals: 5, own_goals: 0
        FactoryBot.create :games_player, game: record, player: record.blue_attacker, position: 'attaker', team: 'blue',
                                         goals: 4, own_goals: 0
        FactoryBot.create :games_player, game: record, player: record.blue_defender, position: 'defender', team: 'blue',
                                         goals: 4, own_goals: 0
      end
    end
  end
end
