$(document).ready(function(){

	// Pagination functions
   	$(".ticket-list").paginate({ 'perPage': 25 });
   	$(".ticket-list").paginate({ 'scope': $('tr') });
	$(".ticket-list").data('paginate').switchPage('next'); //next page
	$(".ticket-list").data('paginate').switchPage('prev'); //previous page

	// Entire table row as link
	$("tbody tr").click(function() {
        window.location = $(this).data("href");
    });

});
  