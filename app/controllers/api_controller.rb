class ApiController < ApplicationController
  include Pureapi::Controller
  include Pundit
  before_action :define_entity
  before_action :set_entity, only: [:show, :update, :destroy]
  def define_entity
    # Just default
    binding.pry
    @entity_model = User
  end
  def index
    @records = core_index_filter(@entity_model)

    render json: { filters: filter_jsons, records: records_as_json(@records) }
  end
  def entity_resources
    render json: ApplicationRecord.descendants.map{|k| { name: k.name }}
  end

  protected
  # Use callbacks to share common setup or constraints between actions.
  def set_entity
    @record = @entity_model.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def entity_params
    params.require(:record).permit(:created_at)
  end

  # Strong parameters for default search query
  def search_params
    params.permit(:id)
  end

  # Strong parameters for default advanced search query
  def advanced_search_params
    params.permit(:created_at)
  end

end
