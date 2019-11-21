Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  devise_for :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'welcome#app'
  # get 'welcome/home'
  # get '/app', to: 'welcome#app', as: 'app'

  resources :application, path: '/' do
    collection do
      get 'entity_resources', to: 'application#entity_resources'
    end
  end

  namespace :api do 
    namespace :v1 do 
      resources :tags
      resources :questions
      resources :answers
    end 
  end
end
