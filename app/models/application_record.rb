class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  class << self
    include Pureapi::Model
    def base_search(params)
      criterias = self
      # get params for each search
      # search fields in model simple
      # search fields in model complex
      # search fields in relations
      return criterias.where({})
    end

    # Define array of columns use for comparison conditions
    # E.g [:id, :name, :channel_course_id, :status]
    def compcond_columns
      self.column_names.map(&:to_sym)
    end
  end
end
