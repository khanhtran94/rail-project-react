module Api
  module V1
    class TagsController < ApiV1Controller
      def define_entity
        @entity_model = Tag
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