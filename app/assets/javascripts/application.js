// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
function courseTemplate(name, details){
  return `<li class="course">
      ${name}
      <div class="details">
        ${details}
      </div>
    </li>`
}

function Course(id, name, details){
  this.id = id;
  this.name = name;
  this.details = details;
}

Course.all = function(callback){
  $.getJSON('/courses').then(function(jsons){
    return jsons.map(function(json){
      return Course.newFromJSON(json)
    });
  }).then(callback);
}

Course.newFromJSON = function(json){
  return new Course(json.id, json.name, json.details);
}

Course.prototype.toTemplate = function(){
  return `<li class="course">
      ${this.name}
      <div class="details">
        ${this.details}
      </div>
    </li>`
};

Course.prototype.toParams = function () {
  return {
    course: {
      name: this.name,
      details: this.details
    }
  };
};

Course.prototype.save = function (callback) {
  $.post('/courses', this.toParams()).then(function(json){
    return Course.newFromJSON(json)
  }).then(callback);
};

$(function(){
  $('.courses').on('click', '.course', function(){
    $(this).find('.details').slideToggle();
  });

  var appendToPage = function(courses){ // This will be Course objects
    var remoteCourses = courses.map(function(course){
      return course.toTemplate();
    });
    $('.courses').append(remoteCourses);
  }

  Course.all(appendToPage);

  $('#add-new-course').on('submit', function(event){
    event.preventDefault();
    var courseName = $(this).find('#course-name').val();
    var courseDetails = $(this).find('#course-details').val();
    // TODO: Gross
    var course = new Course(null, courseName, courseDetails);
    course.save(function(course){
      $('.courses').append(course.toTemplate());
      this.reset();
    }.bind(this));
  });
});
