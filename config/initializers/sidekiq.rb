require 'sidekiq'
require 'sidekiq/web'
require 'sidekiq/cron/web'
url = Rails.env.production? ? 'redis://redis:6379/12' : 'redis://127.0.0.1:6379/12'

schedule_file = "config/sidekiq_schedule.yml"
if File.exists?(schedule_file) && Sidekiq.server?
  Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
end