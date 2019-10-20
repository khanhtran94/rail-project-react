module Api
  module V1
    class QuestionsController < ApiController
      def define_entity
        Question
      end
      # def index
      #   @records = Question.all
      #   render json: @records
      # end

      def show
        @record = Question.find(params["id"])
        puts @record.name
        render json: @record
      end
      def create
        if user_signed_in?
          if question = Question.create(tag_params)
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
        params.require(:question).permit(:name,:description, :id)
      end

      def entity_params
        params.require(:question).permit(:name, :status_id, :email)
      end

      def search_params
        params.permit(:id, :status_id, :email, :name)
      end

      def base_search_params
        params.permit(:name, :status_id, :email)
      end
    end
  end
end