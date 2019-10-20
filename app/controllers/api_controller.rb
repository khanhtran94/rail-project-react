class ApiController < ActionController::API
  include Pureapi::Controller
  include Pundit

  # Define entity model before action
  before_action :define_entity
  before_action :set_entity, only: [:show, :update, :destroy]

  # Require define entity class name
  def define_entity
    send_json_error(['entity model is not defined'], :internal_server_error)
  end

  # Require define report service when call report action
  def define_reportservice
    send_json_error(['report service is not defined'], :internal_server_error)
  end

  # Send error messages with status
  def send_json_error(errors = [], status = :unprocessable_entity)
    render json: errors, status: status
  end

  # GET /api/v03/entity_names(s)
  def index
    authorize define_entity
    @records = core_index_filter(policy_scope(define_entity))
    render json: { filters: filter_jsons, records: records_as_json(@records) }
  end

  # GET /api/v03/entity_names(s)/1
  def show
    authorize @record

    render json: record_as_json(@record)
  end

  # POST /api/v03/entity_names(s)
  def create
    @record = define_entity.new2nd(entity_params, current_user)
    authorize @record

    if @record.save
      render json: record_as_json(@record), status: :created
    else
      render json: @record.errors.full_messages, status: :unprocessable_entity
    end
  end

  # POST /api/v03/entity_names(s)/creates
  def creates
    # Initial will created records
    records_attributes = define_entity.parse_params(entities_params)
    @records = []
    records_attributes = records_attributes.each{|attrs| @records << define_entity.new2nd(attrs, current_user)}

    # Save records
    @records.each{|record| record.save}

    # Return results (need upgrade)
    render json: { records: @records.map{|record| record_as_json(record)} }
  end

  # PATCH/PUT /api/v03/entity_names(s)/1
  def update
    authorize @record
    @record.assign_attributes(entity_params)
    authorize @record

    if @record.save
      render json: record_as_json(@record), status: :ok
    else
      render json: @record.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /api/v03/entity_names(s)/1
  def destroy
    authorize @record

    @record.destroy
  end

  # GET /api/v03/entity_names(s)/report
  def report
    # Prevent load all resources
    if base_search_params[:ids].blank?
      @records = define_entity.where('1 = 0')
    else
      @records = core_report_filter(policy_scope(define_entity))
    end

    _reports = define_reportservice.new(
        { from: report_params[:rparam_from], to: report_params[:rparam_to], records: @records })
    _reports.perform

    _filters = report_filter_jsons

    # Update to default when client handle with date
    _filters[:rparams] = {
        from: _reports.from.strftime('%d/%m/%Y'),
        to: _reports.to.strftime('%d/%m/%Y'),
    }

    render json: {
        filters: _filters,
        reports: _reports.default_reports,
    }
  end

  # Filter searchs of object criteria
  def default_search_filter(objects)

    _temp = {}

    base_search_params.each{|k, v| _temp[k] = v if !v.blank?}
    params[:searches] = _temp
    objects = objects.base_search(_temp)
  end

  # Filter list objects contain search, sort, limit
  def core_report_filter(objects)
    # 1. search
    objects = default_search_filter(objects)
    # 2. sort and default sort is id.desc
    # 3. conditions
    objects = core_cond_filter(objects)
    # 4. limit similar paginate
  end

  # Filter list objects contain search, sort, limit
  def core_export_filter(objects)
    # 1. search
    objects = default_search_filter(objects)
    # 2. sort and default sort is id.desc
    objects = default_sort_filter(objects)
    # 3. conditions
    objects = core_cond_filter(objects)
    # 4. limit similar paginate
  end

  protected
  # Use callbacks to share common setup or constraints between actions.
  def set_entity
    @record = define_entity.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def entity_params
    params.require(:record).permit(:created_at)
  end

  # Only allow a trusted parameter "white list" through.
  def entity_params
    params.require(:records).permit(:created_at)
  end

  # Strong parameters for default search query
  def search_params
    params.permit(:id)
  end

  # Strong parameters for default advanced search query
  def advanced_search_params
    params.permit(:created_at)
  end

  def base_search_params
    params.permit(:id)
  end
end
