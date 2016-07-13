/*
 接口设计模式
 依赖接口的设计模式
 工厂模式
 组合模式
 装饰者模式
 命令模式


*/

(function(){
	var Interface = function(name, methods){
		if(arguments.length != 2){
			throw new Error("Interface constructor called with" + arguments.length + 
			"arguments, but expected exactly 2");
		}
		this.name = name;
		this.methods = [];
		for(var i = 0, len = method.length; i< len; i++){
			if(typeof methods[i] !== 'string'){
				throw new Error("Interface constructor expects method names to be passed in as a string");
			}
			this.methods.push(methods[i])
		}
	};
	
	Interface.ensureImplements = function(object){
		if(arguments.length < 2){
			throw new Error("Interface constructor called with" + arguments.length + 
			"arguments, but expected at least 2");
		}
		
		for(var i = 1, len = arguments.length; i < len; i++){
			var interface = arguments[i];
			if(interface.constructor !== Interface){
				throw new Error("Function Interface.ensureImplements expects arguments two and above to be instance of Interface");
			}
			for(var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++){
				var method = interface.methods[j];
				if(!object[method] || typeof object[method] !== 'function'){
					throw new Error("Function Interface.ensureImplements: object does not implements the " + 
					interface.name + " interface.Method " + method + " was not found");
				}
			}
		}	
	}
	
	var ResultFormatter = function(resultObject){
		if(!(resultObject instanceof TestResult)){
			throw new Error("ResultsFormatter: constructor requires an instance of TestResult as an argument");
		}
		this.resultObject = resultObject;
	};
	
	ResultFormatter.prototype.renderResults = function(){
		
		var dateOfTest = this.resultObject.getDate();
		var resultArray = this.resultObject.getResults();
		
		var resultContainer = document.createElement("div");
		
		var resultsHeader = document.createElement("h3");
		resultsHeader.innerHTML = "Test Results from "+ dateOfTest.toUTCString();
		resultContainer.appendChild(resultsHeader);
		
		var resultsList = document.createElement("ul");
		resultsContainer.appendChild(resultsList);
		
		for(var i = 0, len = resultArray.length; i < len; i++){
			var listItem = document.createElement("li");
			listItem.innerHTML = resultArray[i];
			resultsList.appendChild(listItem);
		}
		
		return resultsContainer;
	};
	
	var ResultSet = new Interface("ResultSet", ["getDate", "getResults"]);
	
	var ResultFormatter = function(resultsObject){
		Interface.ensureImplements(resultObject, ResultSet);
		this.resultObject = resultsObject;
	};
	
	ResultFormatter.prototype.renderResults = function(){
		
		var dateOfTest = this.resultObject.getDate();
		var resultArray = this.resultObject.getResults();
		
		var resultContainer = document.createElement("div");
		
		var resultsHeader = document.createElement("h3");
		resultsHeader.innerHTML = "Test Results from "+ dateOfTest.toUTCString();
		resultContainer.appendChild(resultsHeader);
		
		var resultsList = document.createElement("ul");
		resultsContainer.appendChild(resultsList);
		
		for(var i = 0, len = resultArray.length; i < len; i++){
			var listItem = document.createElement("li");
			listItem.innerHTML = resultArray[i];
			resultsList.appendChild(listItem);
		}
		
		return resultsContainer;
	};
})();
















