class AddColAutoAnserToQuestions < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :auto_answer, :bool, default: false
  end
end
