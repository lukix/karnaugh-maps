define([], function () {
  function BaseComp() {
    this.dependencies = [];
    this.logicObj;
	}
  BaseComp.prototype.addDependency = function (dependency) {
    this.dependencies.push(dependency);
  };
  BaseComp.prototype.update = function (obj) {
    if(typeof(obj) === "undefined") {
      console.log("update - user input");
    } else {
      console.log("update - object change");
    }
    this.updateDependencies();
  };
  BaseComp.prototype.updateDependencies = function () {
    var logicObj = this.logicObj;
    this.dependencies.forEach(function (dependency) {
      dependency.update(logicObj);
    });
  };
	return BaseComp;
});
