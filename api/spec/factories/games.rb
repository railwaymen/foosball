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
  end
end
