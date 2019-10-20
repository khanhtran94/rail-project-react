class Question < ApplicationRecord

	#define relations
	belongs_to :user
	belongs_to :status

	class << self
		def default_onlyasjons
			puts __method__

			[:id, :name, :user_id, :status_id, :created_at, :updated_at]
		end

		def include_entities
			puts __method__

			{
				Status => [:status],
				User => [:user]
			}
		end

		def compcond_columns
			puts __method__

			[:name, :user_id, :status_id]
    end

    def of_entities
			puts __method__

			{
          user: User,
          Status: Status,

      }
    end
    def advanced_search(advanced_params)
			puts __method__
			binding.pry
      criterias = self

      return criterias.where({})
    end
	end
end
