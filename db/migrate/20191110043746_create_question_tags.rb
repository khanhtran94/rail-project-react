class CreateQuestionTags < ActiveRecord::Migration[5.2]
  def change
    create_table :question_tags do |t|
      t.belongs_to :question
      t.belongs_to :tag
      t.timestamps
    end
  end
end
