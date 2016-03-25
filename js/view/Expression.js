define([
   '../others/inheritFrom'
  ,'./BaseComp'
  ,'../logic/BoolSum'
], function (inheritFrom, BaseComp, BoolSum) {
  inheritFrom.call(Expression, BaseComp);
  function Expression(name, ones) {
    this.name = name;
    this.DOMelements = {};
    this.DOMelements.main = this.createDOMelement();
    this.logicObj = new BoolSum();
    this.ones = ones;
	}
  Expression.prototype.createDOMelement = function () {
    var comp = document.createElement("div");
    comp.className = "expression";
    this.DOMelements.expression = document.createElement("span");
    this.DOMelements.expression.innerHTML = "Loading...";
    comp.appendChild(this.DOMelements.expression);
    return comp;
  };
  Expression.prototype.update = function (obj) {
    if(typeof(obj) === "undefined") {
      console.log("updateSum - user input (not defined)");
      //this.updateView();
    } else {
      console.log("updateSum - object change");
      if(this.ones)
        this.logicObj = obj.getMinimalExpressionFromOnes();
      else
        this.logicObj = obj.getMinimalExpressionFromZeroes();
      this.updateView();
    }
    this.updateDependencies();
  }
  Expression.prototype.updateView = function () {
    var str = this.logicObj.toLatexString();
    //this.DOMelements.expression.innerHTML = "$" + str + "$";
    str += " = " + this.logicObj.getDeMorganTransformation().toLatexString();
    this.DOMelements.expression.innerHTML = "$" + str + "$";
    this.DOMelements.expression.style.visibility = "hidden";
    var self = this;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub], function () {
      self.DOMelements.expression.style.visibility = "visible";
    });
  }
  Expression.prototype.getDOMelement = function () {
    return this.DOMelements.main;
  };
	return Expression;
});
