module Api
  module V1
    class QuestionsController < ApiV1Controller
      def define_entity
        @entity_model = Question
      end

      def create
        @record = @entity_model.new2nd(entity_params, current_user)
        if @record.save
          params["tag_id"].each do |tag_id|
            question_tag = QuestionTag.new(question_id: @record.id, tag_id: tag_id["id"])
            question_tag.save
          end
          render json: record_as_json(@record), status: :created
        else
          render json: @record.errors.full_messages, status: :unprocessable_entity
        end

      end

      def destroy
        Question.destroy(params[:id])
      end

      def update
        puts __method__
        question = Question.find(params[:id])

        question.update_attributes(question_params)

        question.update_attributes(auto_answer: false ) if question.answers.count == 1
        render json: question
      end

      protected

      def question_params
        params.require(:question).permit(:name,:content, :id, :user_id, :status_id, :limit, :tag_id)
      end

      def entity_params
        params.require(:question).permit(:name, :status_id, :email, :content, :status_id, :tag_id)
      end

      def search_params
        params.permit(:id, :status_id, :email, :name, :content, :status_id, :tag_id)
      end

      def advanced_search_params
        params.permit(:name, :status_id, :email, :content, :status_id, :tag_id)
      end
    end
  end
end