(function(){
	function isCompatible(other){
		if(other === false || !Array.prototype.push
		|| !Object.hasOwnProperty
		|| !document.createElement
		|| !document	.getElementByTagName){
			return false;
		}
		return true;
	}
	
	function $(){
		var elements = new Array();
		
		for(var i = 0; i < arguments.length; i++){
			var element = arguments[i];
			
			if(typeof element == "string"){
				element = document.getElementById("element");
			}
			
			if(arguments.length == 1){
				return element;
			}
			
			elements.push(element);
			
		}
		return elements;
		
	}
	
	function exampleLibraryMethod(obj){
		if(!(obj = $(obj))){
			reutrn false;
		}
		
	}
	
	function addEvent(node, type, listener){
		if(!isCompatible){
			return false;
		}
		if(!(node = $(node))){
			return false;
		}
		if(node.addEventListener){
			node.addEventListener(type, listener, false);
			return true;
		} else if(node.attachEvent){
			node['e' + type + listener] = listener;
			node[type + listener] = function(){
				node['e' + type + listener](window.event);		
			}
			node.attachEvent('on' + type, listener);
			return true;
		}
		return false;
	}
	
	function removeFunction(node, type, listener){
		if(!(node = $(node))){
			return false;
		}
		if(node.removeEvent){
			node.removeEventListener(type, listener, false);
			return true;
		} else if(node.detachEvent){
			node[type + listener] = null;
			node.detachEvent('on' + type, node[type + listener]);
			return true
		}
		return false;
	}
	
	function getElementsByClassName(className, tag, parent){
		parent = parent || document;
		if(!(parent = $(parent))){
			return false;
		}
		var allTags = (tag == "*" && parent.all) ? parent.all: parent.getElementByTagName(parent);
		var matchingElements = new Array();
		
		className = className.replace(/\-/, "\\-");
		var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
		
		var element;
		for(var i = 0; i < allTags.length; i++){
			element = allTags[i];
			if(regex.test(element.className)){
				matchingElements.push(element);
			}
		}
		return matchingElements;
	}
	
	function toggleDisplay(node, value){
		if(!(node = $(node))){
			return false;
		}
		if(node.style.display != 'none'){
			node.style.display = 'none';
		} else {
			node.style.display = value || '';
		}
		
		return true;
		
	}
	
	function insertAfter(node, referenceNode){
		if(!(node = $(node))){
			return false;
		}
		if(!(referenceNode = $(referenceNode))){
			return false;
		}
		return referenceNode.parent.insertBefore(node, referenceNode.nextSibling);
	}
	
	function removeChildren(parent){
		if(!(parent = $(parent))){
			return false;
		}
		if(parent.firstChild){
			parent.firstChild.parentNode.removeChild(parent.firstChild);
		}
		return parent;
	}
	
	function prependChild(parent, newChild){
		if(!(parent = $(parent))){
			return false;
		}
		if(!(newChild = $(newChild))){
			return false;
		}
		if(parent.firstChild){
			parent.insertBefore(newChild, parent.firstChild);
		} else {
			parent.appendChild(newChild);
		}
		
		return parent;
	}
	
	function bindFunction(obj, func){
		return function(){
			func.apply(obj, arguments);
		};
	}
	
	window['ADS']['isCompatible'] = isCompatible;
	window['ADS']['$'] = $;
	window['ADS']['exampleLibraryMethod'] = exampleLibraryMethod;
	window['ADS']['addEvent'] = addEvent;
	window['ADS']['removeEvent'] = removeEvent;
	window['ADS']['getElementsByClassName'] = getElementsByClassName;
	window['ADS']['toggleDisplay'] = toggleDisplay;
	window['ADS']['insertAfter'] = insertAfter;
	window['ADS']['removeChildren'] = removeChildren;
	window['ADS']['prependChild'] = prependChild;
	window['ADS']['bindFunction'] = bindFunction;
})();