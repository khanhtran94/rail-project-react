class Tag < ApplicationRecord

	#define relations
	has_many :questions

	class << self
		def default_onlyasjsons
			[:id, :name, :description, :created_ad, :updated_at]
		end

		def include_entities
			{
					Question => [:questions]
			}
		end

		def of_entities
			{
					question: Question
			}
		end
	end
end
