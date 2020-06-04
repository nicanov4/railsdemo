Rails.application.routes.draw do
  root to: redirect('/articles')

  get 'articles', to: 'site#index'
  get 'articles/new', to: 'site#index'
  get 'articles/:id', to: 'site#index'
    get 'articles/:id/edit', to: 'site#index'
  devise_for :users

  namespace :api do
    resources :articles do
      resources :comments
    end
  end
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
