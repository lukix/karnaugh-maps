define([
   '../view/KarnaughMap'
	,'../view/Expression'
	,'../logic/BoolVariable'
], function (KarnaughMap, Expression, BoolVariable) {
  return function (x_prop_element, y_prop_element) {
    document.getElementById("createButton").addEventListener("click", function (e) {
      $("#view1").fadeOut(300, function () {
        var kMap = createMap();
        var exps = createExpressions(kMap);
        document.getElementById("view2").appendChild(kMap.getDOMelement());
        document.getElementById("view2").appendChild(exps[0].getDOMelement());
        document.getElementById("view2").appendChild(exps[1].getDOMelement());
        $("#view2").fadeIn(300);
      });
      function createMap() {
        var arr1 = [];
        var arr2 = [];

        var x_prop = parseInt(x_prop_element.innerHTML);
        var y_prop = parseInt(y_prop_element.innerHTML);

        var inputs = document.getElementById("args").getElementsByTagName("span");

        for(var i = 0; i < x_prop; i++) {
          arr1.push(
            new BoolVariable(inputs[i].getElementsByTagName("input")[0].value)
          );
        }
        for(var i = x_prop; i < y_prop+x_prop; i++) {
          arr2.push(
            new BoolVariable(inputs[i].getElementsByTagName("input")[0].value)
          );
        }

        var kMap = new KarnaughMap(name, arr1, arr2);
        return kMap;
      }
      function createExpressions(kMap) {
        var exp1 = new Expression("Expression from ones", true);
        var exp2 = new Expression("Expression from zeroes", false);
        kMap.addDependency(exp1);
        kMap.addDependency(exp2);
        return [exp1, exp2];
      }
    });
  }
});
