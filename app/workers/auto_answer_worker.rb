class AutoAnswerWorker
  include Sidekiq::Worker
  sidekiq_options :queue => :rails_react, :backtrace => true, :retry => 1
  def perform
    puts "workder"
  end
end