class Tag < ApplicationRecord

	#define relations
	has_many :questions
end
