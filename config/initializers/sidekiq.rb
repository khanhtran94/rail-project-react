require 'sidekiq'
require 'sidekiq/web'
require 'sidekiq/cron/web'
url = Rails.env.production? ? 'redis://redis:6379/12' : 'redis://127.0.0.1:6379/12'

Sidekiq.configure_client do |config|
  config.redis = { url: url, namespace: 'rails_react', network_timeout: 5}
  config.average_scheduled_poll_interval = 25
end
Sidekiq.configure_server do |config|
  config.redis = { url: url, namespace: 'rails_react', network_timeout: 5}
  config.average_scheduled_poll_interval = 25
end

schedule_file = "config/sidekiq_schedule.yml"
if File.exists?(schedule_file) && Sidekiq.server?
  Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
end