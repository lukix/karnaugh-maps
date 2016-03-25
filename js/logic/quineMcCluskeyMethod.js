define([
	 './boolSum'
	,'./boolProduct'
	,'./BoolVariable'
	,'./BoolConst'
	,'../others/deduplicateArr'
], function (BoolSum, BoolProduct, BoolVariable, BoolConst, deduplicateArr) {
	//Public:
	return function (minitermsNoNulls, minitermsWithNulls) {
		var arr = getMergedTerms(minitermsWithNulls);
		var filteredArr = extractNotUsedTerms(arr);
		var results = patricksMethod(filteredArr, minitermsNoNulls);
		return results;
	}

	//Private:
	function getMergedTerms(miniterms) {
		var firstStepArr = miniterms.map(function (item) {
			return{binary: item, used: false}
		});
		var arr = [firstStepArr];
		for(var i = 0; i < arr.length; i++) {
			var nextStepArr = createNextStepArr(arr[i]);
			nextStepArr = deduplicateArr(nextStepArr, function (a, b) {
				return a.binary === b.binary && a.used === b.used;
			});
			if(nextStepArr.length !== 0)
				arr.push(nextStepArr);
		}
		return arr;
	};

	function extractNotUsedTerms(arr) {
		//Filter out the used ones
		var filteredArr = [];
		arr.forEach(function (item) {
			filteredArr = filteredArr.concat(item);
		});
		filteredArr = filteredArr.filter(function (item) {
			return !item.used;
		});
		filteredArr = filteredArr.map(function (item) {
			return item.binary;
		});
		return filteredArr;
	}

	function patricksMethod(implicants, miniterms) {
		var variablesImps = implicants.map(function (imp, index) {
			return {variable: new BoolVariable(index+""), implicant: imp};
		});
		var product = new BoolProduct();
		for(var i = 0; i < miniterms.length; i++) {
			var sum = new BoolSum();
			for(var j = 0; j < implicants.length; j++) {
				if(areMatching(miniterms[i], implicants[j])) {
					sum.addComponent(variablesImps[j].variable);
				}
			}
			product.addComponent(sum);
		}
		console.time("createSumOfProducts");
		var sumOfProducts = product.createSumOfProducts();
		console.timeEnd("createSumOfProducts");
		sumOfProducts.sortComponents();
		sumOfProducts.deduplicate();
		var smallestTerms = sumOfProducts.getSmallestTerms();

		var allResults = [];
		for(var i = 0; i < smallestTerms.length; i++) {
			var result = [];
			for(var j = 0; j < smallestTerms[i].components.length; j++) {
				result.push(variablesImps[+smallestTerms[i].components[j].name].implicant);
			}
			allResults.push(result);
		}
		return allResults;
	};

	function createNextStepArr(currentArr) {
		var nextStepArr = [];
		for(var i = 0; i < currentArr.length; i++) {
			for(var j = i+1; j < currentArr.length; j++) {
				var differentBits = numberOfDifferentBits(currentArr[i].binary, currentArr[j].binary);
				if(differentBits === 1) {
					nextStepArr.push({
						 binary: mergeImplicants(currentArr[i].binary, currentArr[j].binary)
						,used: false
					});
					currentArr[i].used = currentArr[j].used = true;
				}
				else if(differentBits === 0)
					currentArr[i].used = true;	//deleted
			}
		}
		return nextStepArr;
	};

	//Private, but make sense alone:
	function numberOfDifferentBits(bin1, bin2) {	//Assumes that bin1.length === bin2.length
		differentBits = 0;
		for(var i = 0; i < bin1.length; i++) {
			if(bin1[i] !== bin2[i])
				differentBits++;
		}
		return differentBits;
	}
	function mergeImplicants(imp1, imp2) {
		var mergedImp = "";
		for(var i = 0; i < imp1.length; i++) {
			if(imp1[i] !== imp2[i])
				mergedImp += "-";
			else
				mergedImp += imp1[i];
		}
		return mergedImp;
	}
	function areMatching(bin1, bin2) {
		for(var i = 0; i < bin1.length; i++) {
			if(bin1[i] !== bin2[i] && bin1[i] !== "-" && bin2[i] !== "-")
				return false;
		}
		return true;
	}
});
