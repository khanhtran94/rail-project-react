class Question < ApplicationRecord

	#define relations
	belongs_to :user
	belongs_to :status

	class << self
		def default_includes
			puts __method__
			[:user, :status]
		end

		def json_methods
			puts __method__
			[
					:email,
					:status_name,
			]
		end

		def json_method_includes
			puts __method__
			{
					email: :user,
					status_name: status,
			}
		end

		def base_search(params)
			puts __method__
			criterias = self

			params = params.inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}
			return criterias.where({})
		end

		def asjson_fields
			puts __method__
			{
					user: {only: [:id, :email]},
					status: {only: [:id, :name]},
			}
		end

		def include_entities
			puts __method__
			{
					User => [:user],
					Status => [:status]
			}
		end

		def of_entities
			puts __method__
			{
					user: User,
					status: Status,
			}
		end
		def compcond_columns
			[:id, :name]
		end
	end
end
