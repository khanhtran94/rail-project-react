class Role < ApplicationRecord
  has_many :users

  class << self

    def default_onlyasjsons
      [:id, :name]
    end

    def include_entities
      {
          User => [:users]
      }
    end

    def of_entities
      {
          user: User
      }
    end

    def advanced_search(advanced_params)
      criterias = self

      return criterias.where({})
    end
  end
end