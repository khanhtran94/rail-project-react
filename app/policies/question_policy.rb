class QuestionPolicy < ApplicationPolicy
  def create?
    true
  end
  def index?
    true
  end
  def edit?
    true
  end
  def destroy?
    true
  end
end