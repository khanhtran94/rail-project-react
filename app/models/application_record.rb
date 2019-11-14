class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  class << self
    include Pureapi::Model
    def new2nd params, current_user
      _record = self.new(params)
      _record.user_id = current_user.id

      #_record[self::ForeignKeys::USER_ID] = current_user.id if _record[self::ForeignKeys::USER_ID].blank?
      #_record[self::ForeignKeys::DEPARTMENT_ID] = current_user.department_id if _record[self::ForeignKeys::DEPARTMENT_ID].blank?
      #_record[self::ForeignKeys::COMPANY_ID] = current_user.company_id if _record[self::ForeignKeys::COMPANY_ID].blank?

      _record
    end
  end

end
