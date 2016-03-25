requirejs.config({
	'paths': {
		'jquery': ['../lib/jquery-1.11.2.min']
	}
});
require([
	 './ui/ProportionsComponent'
	,'./ui/enableViewChanging'
	,'./ui/updateView1'
], function(ProportionsComponent, enableViewChanging, updateView1) {

	(function() {
			var x_prop_element = document.getElementById("props").getElementsByTagName("span")[0];
			var y_prop_element = document.getElementById("props").getElementsByTagName("span")[1];

			var inputs =  document.getElementById("args").getElementsByTagName("span");
			inputs[0].getElementsByTagName("input")[0].addEventListener("keyup", updateView1(x_prop_element, y_prop_element));

			ProportionsComponent();
			enableViewChanging(x_prop_element, y_prop_element);
			updateView1(x_prop_element, y_prop_element)();
	})();
});
