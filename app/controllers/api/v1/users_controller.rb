module Api
  module V1
    class UsersController < ApiV1Controller
      def define_entity
        @entity_model = User
      end

      private

      def user_params
        params.require(:user).permit(:email,:id, :role_id)
      end

      def entity_params
        params.require(:user).permit(:email,:id, :role_id)
      end

      def search_params
        params.permit(:email,:id, :role_id)
      end

      def advanced_search_params
        params.permit(:email,:id, :role_id)
      end
    end
  end
end