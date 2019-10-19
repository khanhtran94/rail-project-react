module Api
  module V1
    class TagsController < ApplicationController
      def index
        @records = Tag.all
        render json: @records
      end

      def show
        @record = Tag.find(params["id"])
        puts @record.name
        render json: @record
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

      def destroy
        puts __method__
        Tag.destroy(params[:id])
      end

      def update
        puts __method__
      end

      private

      def tag_params
        params.require(:tag).permit(:name,:description, :id)
      end
    end
  end
end