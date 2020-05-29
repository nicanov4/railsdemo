Rails.application.routes.draw do
  devise_for :users
  get 'welcome/index'

  namespace :api do
    resources :articles do
      resources :comments
    end
  end

  root 'welcome#index'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
