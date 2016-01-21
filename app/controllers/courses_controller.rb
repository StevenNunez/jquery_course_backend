class CoursesController < ApplicationController
  def index
    # courses = Course.all.to_json
    render json: Course.all
  end

  def create
    course_params = params.require(:course).permit(:name, :details)
    course = Course.create(course_params)
    render json: course
  end
end
