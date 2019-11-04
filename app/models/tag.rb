class Tag < ApplicationRecord

  #define relations
  has_many :questions

  class << self
    def default_onlyasjsons
      [:id, :name, :description, :created_ad, :updated_at]
    end

    def include_entities
      puts __method__
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
      puts __method__
      criterias = self

      return criterias.where({})
    end
  end
end
