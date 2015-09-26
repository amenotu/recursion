// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
	var matches = [];

	var traverse = function(node){
		for(var i = 0; i < node.childNodes.length; i++){
			var child = node.childNodes[i];

			if(child.classList){
				if(child.classList.contains(className)){
					matches.push(child);
				}
			}

			if(child.childNodes.length){
				traverse(child);
			}
		}
	};
	traverse(window.document);
	return matches;
};
