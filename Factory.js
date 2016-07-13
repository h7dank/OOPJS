(function(){
	/*
		SimpleFactory
	*/
	var Bicycle = new Interface('Bicycle', ['assemble', 'wash', 'ride', 'repair']);
	
	var Speedster = function(){	
	};
	Speedster.prototype = {
		assemble: function(){
			
		},
		wash: function(){
			
		},
		ride: function(){
			
		},
		repair: function(){
			
		}
	};
	
	var BicycleFactory = {
		createBicycle: function(model){
			var bicycle;
			
			switch(model){
				case 'The Speedster':
					bicycle = new Speedster();
					break;
			}
			Interface.ensureImplements(bicycle, Bicycle);		
			
			return bicycle;
		}
	};
	
	var BicycleShop = function(){};
	
	BicycleShop.prototype = {
		sellBicycle: function(model){
			var bicycle = BicycleFactory.createBicycle(model);
			
			bicycle.assemble();
			bicycle.wash();
			
			return bicycle;
		}
	};
	
	var californiaCruisers = new BicycleShop();
	var yourNewBike = californiaCruisers.sellBicycle("The Speedster");
	
	
	/*
		Factory
	*/
	
	var BicycleShop = function(){};
	BicycleShop.prototype = {
		sellBicycle: function(model){
			var bicycle = this.createBicycle(model);
			
			bicycle.assemble();
			bicycle.wash();
		},
		createBicycle: function(model){
			throw new Error("Unsupported operation on an abstract class");
		}
	};
	
	var AcmeBicycleShop = function(){};
	extend(AcmeBicycleShop, BicycleShop)
	AcmeBicycleShop.prototype.createBicycle = function(model){
		var bicycle;
		
		switch(model){
			case 'The Speedster':
				bicycle = new AcmeSpeedster();
				break;
		}
		Interface.ensureImplements(bicycle, Bicycle);
		return bicycle;
	};
	
	var GenernalProductsBicycleShop = function(){};
	extend(GenernalProductsBicycleShop, BicycleShop);
	GenernalProductsBicycleShop.prototype.createBicycle = function(model){
		var bicycle;
		
		switch(model){
			case 'The Speedster':
				bicycle = new GenernalProductsSpeedster();
				break;
		}
		
		Interface.ensureImplements(bicycle, Bicycle);
		return bicycle;
	};
	
	var alecsCruisers = new AcmeBicycleShop();
	var yourNewBike = alecsCruisers.sellBicycle("The Speedster");
	
	var bobsCruisers = new GenernalProductsBicycleShop();
	var yourSecondBike = bobsCruisers.sellBicycle("The Speedster");
	
	/*
		XHR Factory
	*/
	
	var AjaxHandler = new Interface('AjaxHandler', ['request', 'createXhrObject']);
	
	var SimpleHandler = function(){};
	SimpleHandler.prototype = {
		request: function(method, url, callback, postVars){
			var xhr = this.createXhrObject();
			xhr.onreadystatechange = function(){
				if(xhr.readyState !== 4){
					return ;
				}
				(xhr.status === 200)?
				callback.success(xhr.responseText, xhr.responseXML):
				callback.failure(xhr.status);
			};
			xhr.open(method, url, true);
			if(method !== 'POST'){
				postVars = null;
			}
			xhr.send(postVars);
		},
		createXhrObject: function(){
			var methods= [
				function(){
					return new XMLHttpRequest();
				},
				function(){
					return new ActiveXObject('Msxml2.XMLHTTP');
				},
				function(){
					return new ActiveXObject('Microsoft.XMLHTTP');
				}
			];
			for(var i = 0, len = methods.length; i< len; i++){
				try{
					methods[i]();
				} catch(e){
					continue;
				}
			}
		}
	};
	
})();