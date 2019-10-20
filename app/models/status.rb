class Status < ApplicationRecord
	has_many :questions
	class << self
		def include_entities
			{
					Question => [:questions]
			}
		end
	end

end
