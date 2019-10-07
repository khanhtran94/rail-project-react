module Api
  module V1
    class TagsController < ApplicationController
      def index
        @records = Tag.all
        render json: @records
      end

      def create
        if user_signed_in?
          if tag = Tag.create(tag_params)
            render json: tag, status: 200
          else
            render json: tag.errors, status: 400
          end
        else
          render json: {}, status: 401
        end
      end

      private

      def tag_params
        params.require(:tag).permit(:name,:description)
      end
    end
  end
end