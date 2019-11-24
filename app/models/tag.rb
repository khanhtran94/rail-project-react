class Tag < ApplicationRecord

  #define relations
  has_many :question_tags
  has_many :questions, :through => :question_tags
  
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

    def advanced_search(advanced_params)
      criterias = self

      return criterias.where({})
    end
  end
end
