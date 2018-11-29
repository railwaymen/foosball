# frozen_string_literal: true

FactoryBot.define do
  factory :team do
    after :build do |record|
      record.attacker ||= FactoryBot.create :player
      record.defender ||= FactoryBot.create :player
      record.tournament ||= FactoryBot.create :tournament
    end
  end
end
