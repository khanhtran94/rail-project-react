module Api
  module V1
    class RolesController < ApiV1Controller
      def define_entity
        @entity_model = Role
      end

      private

      def user_params
        params.require(:role).permit(:id, :name)
      end

      def entity_params
        params.require(:role).permit(:id, :name)
      end

      def search_params
        params.permit(:id, :name)
      end

      def advanced_search_params
        params.permit(:id, :name)
      end
    end
  end
end
