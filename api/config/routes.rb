# frozen_string_literal: true

Rails.application.routes.draw do
  resources :players, only: :index
  resources :games, only: %i[create index]
  resources :tournaments, only: %i[index create] do
    resources :groups, only: :index
  end
end
