$(document).ready(function() {

	$(document).on("click", function(e) {
		var screenWidth = window.innerWidth;
		if (screenWidth < 991) {
			$("#navbarSupportedContent").collapse('hide');
		}
	});

});

(function (global) {

	var bw = {};
	var homeHtml = "snippets/homePage.html";
	var allCategoriesUrl = 
	"https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
	
	var menuCategoriesTitleHtml = "snippets/menuCategoriesTitle.html";
	var categoryTileHtml = "snippets/categoryTile.html";

// Inserting innerHTML for "select"
	var insertHtml = function (selector, html) {
		var targetElement = document.querySelector(selector);
		targetElement.innerHTML = html;
	};

// Show loading icon inside element identified by 'selector'
	var showLoading = function (selector) {
		var html = "<div class='text-center'>";
		html += "<img src='image/loader.gif'></div>";
		insertHtml(selector, html);
	};

// Return substitute of '{{propName}}' 
// with propValue in given 'string'
	var insertProperty = function (string, propName, propValue)
	{
		var propToReplace = "{{" + propName + "}}";
		string = string.replace(new RegExp(propToReplace, "g"), 
			propValue);
		return string;
	}

// On page load (before images or CSS)
	document.addEventListener("DOMContentLoaded", 
		function (event) 
		{

          // Show home view on first load
			showLoading("#main-content");
			$.ajax({
				url: homeHtml,
				type: "get",
				success: function (responseText) {
					document.querySelector("#main-content")
					.innerHTML = responseText;
				}
			});
			console.log("test", homeHtml);

		});

// Load the menu categories view
	bw.loadMenuCategories = function () {
		showLoading("#main-content");
		$.ajax({
			url: allCategoriesUrl,
			type: "get",
			success: buildAndShowCategoriesHTML
		});		
	};

//Build HTML for the categoties page based on the data 
// from the server
	function buildAndShowCategoriesHTML (categories) {

		// Load title snippet of categories page
		$.ajax({
			url: menuCategoriesTitleHtml,
			type: "get",
			success: function (menuCategoriesTitleHtml){

				//Retrieve single category snippet 
				$.ajax({
					url: categoryTileHtml,
					type: "get",
					success: function (categoryTileHtml) {
						var categoriesViewHtml = 
						buildCategoriesViewHtml(categories,
							menuCategoriesTitleHtml,categoryTileHtml);
						insertHtml("#main-content", categoriesViewHtml);
					}
				});
			}
		});
	}

//Build categories view HTML to be inserted into page
	function  buildCategoriesViewHtml(categories,
		menuCategoriesTitleHtml,
		categoryTileHtml){

		var finalHtml = menuCategoriesTitleHtml;
		finalHtml+= "<section class='row'>"

		for (var i = 0; i < categories.length; i++) {

	// Insert category values
			var html = categoryTileHtml;
			var name = "" + categories[i].name;
			var short_name = categories[i].short_name;
			html = insertProperty(html, "name", name);
			html= insertProperty(html, "short_name", short_name);
			finalHtml += html;
		}
		finalHtml += "</section>";
		return finalHtml;
	}

	window.$bw = bw;
})(window);