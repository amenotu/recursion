// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var str = ""; //to hold the results of primitive values being stringified
	var props = [];//to hold the properties of obj arguments
	var length; //just keeps track of length

    //stringifies null if found in an obj
    if (obj === null){
        return str += obj;
    //stringifies a number or a boolean
    } else if(typeof obj === "boolean" || typeof obj === "number"){
        return str += obj;
    //stringifies a string
    } else if(typeof obj === "string"){
        return str += ('"' + obj + '"');
    //stringifies an array
    } else if(typeof obj === "object" && obj.length !== undefined){
        var arrstart = "[";
        var arrend = "]";
        for(var i = 0; i < obj.length; i++){
        	if(i < obj.length -1){//checks to see if the element is in the beginning or middle of the array so a comma is concatenated at the end
        	    if(obj[i] === undefined || typeof obj[i] === "function"){
                	arrstart += (null + ",");
            	} else if(typeof obj[i] === "object" && obj[i].length !== undefined){
            	    arrstart += stringifyJSON(obj[i]) + ",";
            	} else if(typeof obj[i] === "object" && typeof obj[i] !== "function"){
        	        arrstart += stringifyJSON(obj[i]) + ",";
        	    } else if(typeof obj[i] === "string"){
                	arrstart += '"' + obj[i] + '"' + ",";
            	} else {
                	arrstart += obj[i] + ",";
            	}
        	} else if(i === obj.length -1){ //checks to see if the element is the last one, so no comma
            	if(obj[i] === undefined || typeof obj[i] === "function"){
                	arrstart += null;
            	} else if(typeof obj[i] === "object" && obj[i].length !== undefined){
            	    arrstart += stringifyJSON(obj[i]);
            	} else if(typeof obj[i] === "object" && typeof obj[i] !== "function"){
        	        arrstart += stringifyJSON(obj[i]);
        	    }else if(typeof obj[i] === "string"){
                	arrstart += ('"' + obj[i] + '"');
            	} else {
                	arrstart += obj[i];
            	}
        	}
    	}
    	return arrstart + arrend;
    //stringifies an object	
    } else if(typeof obj === "object" && typeof obj !== "function"){
        var objstart = "{";
        var objend = "}";
        for(var k in obj){
			props.push(k);
			length = props.length;
		}
        for(var j = 0; j < length; j++){
        	var key = '"' + props[j] + '"' + ":";
        	if(j < length-1){//checks to see if the elements are the first or middle of the object so a comma is concatenated at the end
            	if (obj[props[j]] === null){ 
                	objstart += key + obj[props[j]] + ",";
        	    } else if(typeof obj[props[j]] === "object" && obj[props[j]].length !== undefined){
        	        objstart += key + stringifyJSON(obj[props[j]]) + ",";
        	    } else if(typeof obj[props[j]] === "object" && typeof obj[props[j]] !== "function") {
            	    objstart += key + stringifyJSON(obj[props[j]]) + ",";
            	} else if(typeof obj[props[j]] === "number" || typeof obj[props[j]] === "boolean"){
                	objstart += key + obj[props[j]] + ",";
            	} else if(obj[props[j]] === undefined || typeof obj[props[j]] === "function"){
                	continue;
            	} else {
                	objstart += (key + '"' + obj[props[j]] + '"') + ",";
            	}
        	} else { //the element is found at the end and thus no comma
        	    if (obj[props[j]] === null){ 
                	objstart += key + obj[props[j]];
        	    } else if(typeof obj[props[j]] === "object" && obj[props[j]].length !== undefined){//if there is a property in obj that is an array
        	        objstart += key + stringifyJSON(obj[props[j]]);//pass the element into stringifyJSON as an argument
        	    } else if(typeof obj[props[j]] === "object" && typeof obj[props[j]] !== "function") {
            	    objstart += key + stringifyJSON(obj[props[j]]);//same thing happens when an object if found, stringifyJSON is called
            	} else if(typeof obj[props[j]] === "number" || typeof obj[props[j]] === "boolean"){
                	objstart += key + obj[props[j]];
            	} else if(obj[props[j]] === undefined || typeof obj[props[j]] === "function"){
                	continue;
            	} else {
                	objstart += (key + '"' + obj[props[j]] + '"');
            	} 
        	}
    	}
    	return objstart + objend;
    }
    return stringifyJSON(obj);
};
