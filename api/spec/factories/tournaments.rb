# frozen_string_literal: true

FactoryBot.define do
  factory :tournament do
    sequence :name do |n|
      "Tournament ##{n}"
    end
  end
end
