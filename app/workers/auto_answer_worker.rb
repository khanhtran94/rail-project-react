class AutoAnswerWorker
  include Sidekiq::Worker
  sidekiq_options :queue => :rails_react, :backtrace => true, :retry => 1
  def perform
    _to_do = {}
    _done = {}
    # duyet qua cac cau hoi status: to do
    questions_todo = Question.where(status_id: 1)
    questions_todo.each do |question|
      _to_do["#{question.id}"] = question.tags.pluck(:id)
    end
    # lay nhung cau hoi done
    questions_done = Question.where(status_id: 3).where(auto_ansert: false)
    questions_done.each do |question|
      _done["#{question.id}"] = question.tags.pluck(:id)
    end
    _to_do.each do |k_to_do,v_to_do|
      if v_to_do.present?
        _done.each do |k_done,v_done|
          if !v_done.nil? && v_done.sort == _to_do[k_to_do].sort
            puts "match"
            answer = Answer.new(
                               question_id: k_to_do.to_i,
                               user_id: 1,
                               content: "http://localhost:3000/#/questions/edit/#{k_done.to_i}"
            )
            Question.find(k_to_do).update(status_id: 2, auto_answer: true)
            answer.save
          else
            puts "not match"
          end
        end
      end
    end
  end
end