Rails.application.routes.draw do

  root 'site#index'
  
  devise_for :users

  namespace :api do
    resources :articles do
      resources :comments
    end
  end
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
