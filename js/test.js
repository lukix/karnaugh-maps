var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require
});
requirejs(
	[
		 './logic/BoolExpression'
    ,'./logic/BoolVariable'
    ,'./logic/BoolConst'
    ,'./logic/BoolSum'
    ,'./logic/BoolProduct'
    ,'./logic/BoolNot'
    ,'./logic/TruthTable'
	], function(BoolExpression, BoolVariable, BoolConst, BoolSum, BoolProduct, BoolNot, TruthTable) {
    var x0 = new BoolVariable("x0");
    var x1 = new BoolVariable("x1");
    var x2 = new BoolVariable("x2");
    var x3 = new BoolVariable("x3");
    var x4 = new BoolVariable("x4");
    var x5 = new BoolVariable("x5");

    var tt1 = new TruthTable([x0, x1, x2, x3, x4, x5]);

    tt1.fillFromExpression(new BoolConst(0));  //same zera

    tt1.setValue(0, 1);
    tt1.setValue(3, 1);
    tt1.setValue(0, 1);
    tt1.setValue(9, 1);
    tt1.setValue(11, 1);
    tt1.setValue(18, 1);
    tt1.setValue(30, 1);
    tt1.setValue(63, 1);

    var exp2 = tt1.getMinimalExpressionFromZeroes();
    console.log("2) ", exp2.toString());
    //*/
  }
);
