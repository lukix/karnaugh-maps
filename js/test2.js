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
    ,'./others/deduplicateArr'
	], function(BoolExpression, BoolVariable, BoolConst, BoolSum, BoolProduct, BoolNot, TruthTable, deduplicateArr) {
    var K = new BoolVariable("K");
    var L = new BoolVariable("L");
    var M = new BoolVariable("M");
    var N = new BoolVariable("N");
    var P = new BoolVariable("P");
    var Q = new BoolVariable("Q");

    var exp1 = new BoolProduct(
       new BoolSum(K, L)
      ,new BoolSum(K, M)
      ,new BoolSum(L, N)
      ,new BoolSum(M, P)
      ,new BoolSum(N, Q)
      ,new BoolSum(P, Q)
    );
    var exp2 = exp1.createSumOfProducts();
    var exp3 = exp2.getSmallestTerms();
    console.log(exp1.toString());
    console.log(exp2.toString());
    console.log(exp3.toString());
    exp2.sortComponents();
    exp2.deduplicate();
    console.log(exp2.toString());
  }
);
