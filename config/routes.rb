Rails.application.routes.draw do
  # get '/', to: "home#index"
  root "home#index"
  resources :courses, only: [:index, :create]
end
