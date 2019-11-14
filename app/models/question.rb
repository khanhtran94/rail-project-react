class Question < ApplicationRecord

	#define relations
	belongs_to :user
	belongs_to :status
	has_many :answers
	has_many :question_tags
	has_many :tags, :through => :question_tags

	class << self
		def default_onlyasjons
			[:id, :name, :user_id, :status_id, :created_at, :updated_at]
		end

		def include_entities
			puts __method__
			# trong dau [] la dung de chi moi quan he cua model
			{ User => [:user],
				Status => [:status],
				Answer => [:answers],
				Tag => [:tags]
			}
		end

		def compcond_columns

			[:name, :user_id, :status_id]
    end

    def of_entities
			{
          user: User,
          status: Status,
					answer: Answer,
					tags: Tag,

      }
    end
    def advanced_search(advanced_params)
      criterias = self

      return criterias.where({})
    end
	end
end
