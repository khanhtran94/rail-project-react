module Api
  module V1
    class QuestionsController < ApiV1Controller
      def define_entity
        @entity_model = Question
      end

      def show
        @record = Question.find(params["id"])
        puts @record.name
        render json: @record
      end
      
      def create
        if user_signed_in?
          if question = current_user.questions.create(question_params)
            render json: question, status: 200
          else
            render json: question.errors, status: 400
          end
        else
          render json: {}, status: 401
        end
      end

      def destroy
        Question.destroy(params[:id])
      end

      def update
        puts __method__
        question = Question.find(params[:id])
        question.update_attributes(question_params)
        render json: tag
      end

      protected

      def question_params
        params.require(:question).permit(:name,:content, :id, :user_id, :status_id, :limit)
      end

      def entity_params
        params.require(:question).permit(:name, :status_id, :email, :content, :status_id)
      end

      def search_params
        params.permit(:id, :status_id, :email, :name, :content, :status_id)
      end

      def advanced_search_params
        params.permit(:name, :status_id, :email, :content, :status_id)
      end
    end
  end
end