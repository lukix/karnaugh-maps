define([], function () {
	function deduplicateArr(array, equalityFunction) {
    return array.filter(function(item, index, arr) {
			return customIndexOf(arr, item, equalityFunction) === index;
		});
	}
  function customIndexOf(array, value, equalityFunction) {
    var position = -1;
    for(var i = 0; i < array.length; i++) {
      if(equalityFunction(array[i], value)) {
          position = i;
          break;
      }
    }
    return position;
  }
	return deduplicateArr;
});
