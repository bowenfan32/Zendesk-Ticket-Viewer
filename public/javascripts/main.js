$(document).ready(function(){

   	$(".ticket-list").paginate({ 'perPage': 25 });
   	$(".ticket-list").paginate({ 'scope': $('li') });
   	// $(".ticket-list").data('paginate').switchPage(1);
	$(".ticket-list").data('paginate').switchPage('next'); //next page
	$(".ticket-list").data('paginate').switchPage('prev'); //previous page

});
  