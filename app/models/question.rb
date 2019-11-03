class Question < ApplicationRecord

	#define relations
	belongs_to :user
	belongs_to :status
	has_many :answers

	class << self
		def default_onlyasjons
			puts __method__

			[:id, :name, :user_id, :status_id, :created_at, :updated_at]
		end

		def include_entities
			puts __method__
			# trong dau [] la dung de chi moi quan he cua model
			{ User => [:user],
				Status => [:status],
				Answer => [:answers],
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
          status: Status,
					answer: Answer,

      }
    end
    def advanced_search(advanced_params)
			puts __method__
      criterias = self

      return criterias.where({})
    end
	end
end
