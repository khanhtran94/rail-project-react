module Api
  module V1
    class AnswersController < ApiV1Controller
      def define_entity
        @entity_model = Answer
      end

      def create
        @record = @entity_model.new2nd(entity_params, current_user)
        if @record.save
          question = Question.find params["question_id"]
          question.status_id = 2
          question.save

          params["tag_id"].each do |tag_id|
            question_tag = QuestionTag.new(question_id: question.id, tag_id: tag_id["id"])
            question_tag.save
          end
          render json: record_as_json(@record), status: 200
        else
          render json: @record.errors.full_messages, status: :unprocessable_entity
        end

      end

      protected

      def answer_params
        params.require(:answer).permit(:id,:content, :created_at, :updated_at, :user_id, :question_id, :tag_id)
      end

      def entity_params
        params.require(:answer).permit(:id,:content, :created_at, :updated_at, :user_id, :question_id, :tag_id)
      end

      def search_params
        params.require(:answer).permit(:id,:content, :created_at, :updated_at, :user_id, :question_id, :tag_id)
      end

      def advanced_search_params
        params.require(:answer).permit(:id,:content, :created_at, :updated_at, :user_id, :question_id, :tag_id)
      end
    end
  end
end