$(document).ready(function() {

	$(document).on("click", function(e) {
		var screenWidth = window.innerWidth;
		if (screenWidth < 991) {
			$("#navbarSupportedContent").collapse('hide');
		}
	});

});

