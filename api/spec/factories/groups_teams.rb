# frozen_string_literal: true

FactoryBot.define do
  factory :groups_team do
    after :build do |record|
      record.group ||= FactoryBot.create :group
      record.team ||= FactoryBot.create :team
    end
  end
end
