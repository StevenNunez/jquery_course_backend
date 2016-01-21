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
$(function(){
  $('.courses').on('click', '.course', function(){
    $(this).find('.details').slideToggle();
  });

  $('#add-new-course').on('submit', function(event){
    event.preventDefault();
    var courseName = $(this).find('#course-name').val();
    var courseDetails = $(this).find('#course-details').val();
    var template = `<li class="course">
      ${courseName}
      <div class="details">
        ${courseDetails}
      </div>
    </li>`
    $('.courses').append(template);
    this.reset();
  });
});
