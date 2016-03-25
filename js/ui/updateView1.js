define([], function () {
  return function (x_prop_element, y_prop_element) {
    var argsElement = document.getElementById("args");
    var inputs = argsElement.getElementsByTagName("span");
    return function update () {
      //Adding next text field
      if(inputs[inputs.length-1].getElementsByTagName("input")[0].value != "") {
        var comma = document.createElement("span");
        comma.innerHTML = ",";

        var textField = document.createElement("input");
        textField.type = "text";
        textField.placeholder = "__";
        textField.addEventListener("keyup", update);
        comma.appendChild(textField);
        argsElement.appendChild(comma);

        inputs = argsElement.getElementsByTagName("span");
      }

      //Removing unnecessary text fields
      var firstUnnecessaryFieldIndex = 0;
      for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].getElementsByTagName("input")[0].value != "")
          firstUnnecessaryFieldIndex = i+1;
      }
      for(var i = inputs.length-1; i >= firstUnnecessaryFieldIndex+1; i--) {
        inputs[i].remove();
      }

      //Update proportions
      var x_prop = parseInt(x_prop_element.innerHTML);
      var y_prop = parseInt(y_prop_element.innerHTML);
      var sum = inputs.length-1;

      while(x_prop+y_prop !== sum) {
        if(x_prop+y_prop < sum) {
          x_prop++;
        }
        else {
          if(x_prop > 0)
            x_prop--;
          else
            y_prop--;
        }
      }

      x_prop_element.innerHTML = x_prop;
      y_prop_element.innerHTML = y_prop;
    }
  }
});
