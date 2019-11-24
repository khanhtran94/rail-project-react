class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :posts
  has_many :questions
  belongs_to :role

  class << self
    def default_onlyasjsons
      [:id, :email, :role_id]
    end

    def include_entities
      {
          Role => [:role]
      }
    end

    def of_entities
      {
          role: Role
      }
    end

    def advanced_search(advanced_params)
      criterias = self

      return criterias.where({})
    end
  end
end
