class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  class << self
    include Pureapi::Model
  end
end
