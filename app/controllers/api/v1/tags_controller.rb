module Api
  module V1
    class TagsController < ApplicationController
      def index
        @records = Tag.all
        render json: @records
      end
    end
  end
end