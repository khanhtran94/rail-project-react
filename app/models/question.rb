class Question < ApplicationRecord

	#define relations
	belongs_to :user
	belongs_to :status
end
