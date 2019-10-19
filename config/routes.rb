Rails.application.routes.draw do
  devise_for :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'welcome#app'
  # get 'welcome/home'
  # get '/app', to: 'welcome#app', as: 'app'
  namespace :api do 
    namespace :v1 do 
      resources :posts
      resources :tags
    end 
  end
end
