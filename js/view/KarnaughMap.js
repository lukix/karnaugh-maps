define([
   '../others/inheritFrom'
  ,'./BaseComp'
  ,'../logic/TruthTable'
  ,'../others/greyCode'
], function (inheritFrom, BaseComp, TruthTable, getGreyCode) {
  inheritFrom.call(KarnaughMap, BaseComp);
  function KarnaughMap(name, variablesX, variablesY) {
    this.name = name;
    this.DOMelements = {};
    this.DOMelements.main = this.createDOMelement(variablesX, variablesY);
    var variables = variablesX.concat(variablesY);
    this.logicObj = new TruthTable(variables);
	}
  KarnaughMap.prototype.createDOMelement = function (varsX, varsY) {
    var x = varsX.length;
    var y = varsY.length;
    var greyCodeX = getGreyCode(x);
    var greyCodeY = getGreyCode(y);
    var comp = document.createElement("div");
    comp.className = "karnaughMap";
    var table = document.createElement("table");
    var tr1 = document.createElement("tr");
    var td1 = document.createElement("td");

    //Arguments in first td element
    var args_x_div = document.createElement("div");
    var args_y_div = document.createElement("div");
    var mapFunc = function (item) { return item.name };
    args_x_div.innerHTML = varsX.map(mapFunc).reverse().join(" ");
    args_y_div.innerHTML = varsY.map(mapFunc).reverse().join(" ");
    td1.appendChild(args_x_div);
    td1.appendChild(args_y_div);

    tr1.appendChild(td1);
    for(var i = 0; i < Math.pow(2, x); i++) {
      var temp_td = document.createElement("td");
      temp_td.innerHTML = greyCodeX[i];
      tr1.appendChild(temp_td);
    }
    table.appendChild(tr1);
    for(var i = 0; i < Math.pow(2, y); i++) {
      var temp_tr = document.createElement("tr");
      var temp_td1 = document.createElement("td");
      temp_td1.innerHTML = greyCodeY[i];
      temp_tr.appendChild(temp_td1);
      for(var j = 0; j < Math.pow(2, x); j++) {
        var temp_td = document.createElement("td");
        var THIS = this;
        (function (x, y, DOMtd) {
          temp_td.addEventListener('click', function () {
            THIS.changeValue(greyCodeY[y]+greyCodeX[x], DOMtd);
          });
        })(j, i, temp_td);
        temp_tr.appendChild(temp_td);
      }
      table.appendChild(temp_tr);
    }
    comp.appendChild(table);

    var functionNameElement = document.createElement("div");
    functionNameElement.className = "functionName";
    var functionNameContainerElement = document.createElement("div");
    functionNameContainerElement.className = "functionNameContainer";
    functionNameContainerElement.innerHTML = "F";
    functionNameElement.appendChild(functionNameContainerElement);
    comp.appendChild(functionNameElement);

    return comp;
  };
/*
<div class="karnaughMap">
  <table>
    <tr>
      <td></td>
      <td ng-repeat="v in data.greyCodeX">{{v}}</td>
    </tr>
    <tr ng-repeat="(y, row) in data.values">
      <td>{{data.greyCodeY[y]}}</td>
      <td ng-repeat="(x, v) in row track by $index" ng-click="changeValue(x, y)">{{v}}</td>
    </tr>
  </table>
  <div class="functionName">
    <div class="functionNameContainer" ng-click="log()">
      {{data.functionName}}
    </div>
  </div>
</div>
*/
  KarnaughMap.prototype.changeValue = function (grey, DOMtd) {
    var val = getNextVal(DOMtd.innerHTML);
    DOMtd.innerHTML = val;
    if(val === '')
      val = null;
    else
      val = +val;
    this.logicObj.setValue(parseInt(grey, 2), val);
    this.updateDependencies(this.logicObj);

    function getNextVal(currentVal) {
      var cycle = ['0', '1', ''];
      return cycle[(cycle.indexOf(currentVal)+1)%cycle.length];
    }
  };

  KarnaughMap.prototype.update = function (obj) {
    if(typeof(obj) === "undefined") {
      console.log("updateSum - user input (not defined)");
      //this.updateView();
    } else {
      console.log("updateSum - object change (not defined)");
    }
    this.updateDependencies(this.logicObj);
  }
  KarnaughMap.prototype.getDOMelement = function () {
    return this.DOMelements.main;
  };
	return KarnaughMap;
});
