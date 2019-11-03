module Api
  module V1
    class TagsController < ApiV1Controller
      def define_entity
        @entity_model = Tag
      end

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
        Tag.destroy(params[:id])
      end

      def update
        puts __method__
        tag = Tag.find(params[:id])
        tag.update_attributes(tag_params)
        render json: tag
      end

      private

      def tag_params
        params.require(:tag).permit(:name,:description, :id)
      end

      def entity_params
        params.require(:tag).permit(:id, :name, :description)
      end

      def search_params
        params.permit(:id, :name, :description)
      end

      def advanced_search_params
        params.permit(:id, :name, :description)
      end
    end
  end
end