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
  // Get the json
  $.getJSON('/courses', function(coursesJson){
    // Convert the responses to an array of Course Objects
    var courses = coursesJson.map(function(course){
      return Course.newFromJSON(course)
    });
    // Call the function (callback), with the array of Course Objects
    //   as the argument
    callback(courses);
  });
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

// toTemplate
// save
// Course.all

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

  // $.getJSON('/courses', function(courses){
  //   var remoteCourses = courses.map(function(course){
  //     var courseObject = new Course(course.id, course.name, course.details);
  //     return courseObject.toTemplate();
  //   });
  //   $('.courses').append(remoteCourses);
  // });
  $('#add-new-course').on('submit', function(event){
    event.preventDefault();
    var courseName = $(this).find('#course-name').val();
    var courseDetails = $(this).find('#course-details').val();

    $.post('/courses', {course: {name: courseName, details: courseDetails}}, function(course){
      var template =  courseTemplate(course.name, course.details)
      $('.courses').append(template);
      this.reset();
    }.bind(this))
  });
});
