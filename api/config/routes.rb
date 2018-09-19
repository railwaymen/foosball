Rails.application.routes.draw do
  resources :players, only: :index
  resources :games, only: :create
end
