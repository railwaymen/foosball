Rails.application.routes.draw do
  resources :players, only: :index
  resources :games, only: :create
  resources :tournaments, only: :index do
    resources :groups, only: :index
  end
end
