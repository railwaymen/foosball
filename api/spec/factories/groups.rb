# frozen_string_literal: true

FactoryBot.define do
  factory :group do
    sequence(:name) { |i| "Name #{i}" }

    after :build do |record|
      record.tournament ||= FactoryBot.create :tournament
    end
  end
end
