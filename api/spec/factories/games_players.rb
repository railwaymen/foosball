# frozen_string_literal: true

FactoryBot.define do
  factory :games_player do
    goals { 5 }
    own_goals { 1 }
    position { 'attaker' }
    team { 'red' }

    after :build do |record|
      record.game ||= FactoryBot.create :game
      record.player ||= FactoryBot.create :player
    end
  end
end
