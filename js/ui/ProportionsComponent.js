define([], function () {
  var x_prop_element = document.getElementById("props").getElementsByTagName("span")[0];
  var y_prop_element = document.getElementById("props").getElementsByTagName("span")[1];
	function ProportionsComponent () {
    document.getElementsByClassName("arrows")[0].addEventListener("click", ProportionsComponent.shiftLeft);
    document.getElementsByClassName("arrows")[1].addEventListener("click", ProportionsComponent.shiftRight);
  }
  ProportionsComponent.shiftLeft = function() {
    var x_prop = parseInt(x_prop_element.innerHTML);
    var y_prop = parseInt(y_prop_element.innerHTML);
    if(y_prop > 0) {
      x_prop++;
      y_prop--;
      x_prop_element.innerHTML = x_prop;
      y_prop_element.innerHTML = y_prop;
    }
  }
  ProportionsComponent.shiftRight = function() {
    var x_prop = parseInt(x_prop_element.innerHTML);
    var y_prop = parseInt(y_prop_element.innerHTML);
    if(x_prop > 0) {
      x_prop--;
      y_prop++;
      x_prop_element.innerHTML = x_prop;
      y_prop_element.innerHTML = y_prop;
    }
  }

  return ProportionsComponent;
});
