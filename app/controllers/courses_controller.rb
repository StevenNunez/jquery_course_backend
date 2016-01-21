class CoursesController < ApplicationController
  def index
    # courses = Course.all.to_json
    render json: Course.all
  end
end
