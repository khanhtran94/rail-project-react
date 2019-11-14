class AddStatusRefToQuestions < ActiveRecord::Migration[5.2]
  def change
    add_reference :questions, :status, foreign_key: true
  end
end
