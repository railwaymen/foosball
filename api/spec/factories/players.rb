# frozen_string_literal: true

FactoryBot.define do
  factory :player do
    sequence(:email) { |i| "example#{i}@email.com" }
    sequence(:first_name) { |i| "First Name #{i}" }
    sequence(:last_name) { |i| "Last Name #{i}" }
  end
end
