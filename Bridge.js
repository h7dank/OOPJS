/*
	Bridge
*/
(function(){
	/*Before*/
	addEvent(element, 'click', getBeerById);
	function getBeerById(e){
		var id = this.id;
		asyncRequest('GET', 'beer.php', function(resp){
			console.log(resp.responseText);
		});
	}
	/*After*/
	function getBeerById(id, callback){
		asyncRequest('GET', 'beer.php', function(resp){
			callback(resp.responseText);
		});
	}
	function getBeerByIdBridge(e){
		getBeerById(this.id, function(beer){
			console.log(id);
		});
	}
	/*Other Example*/
	var Public = function(){
		var secret = 3;
		this.privilegedGetter = function(){
			return secret;
		};
	};
	
	var Class1 = function(a, b, c){
		this.a = a;
		this.b = b;
		this.c = c;
	}
	
	var Class2 = function(d){
		this.d = d;
	}
	
	var BridgeClass = function(a, b, c, d){
		this.one = new Class1(a, b, c);
		this.two = new Class2(d);
	}
	
	
	
	var asyncRequest = (function(){
		function handleReadyState(o, callback){
			var poll = window.setInterval(function(){
				if(o && o.readyState == 4){
					window.clearInterval(poll);
					if(callback){
						callback(o);
					}
				}
			}, 50);
		}
		var getXHR = function(){
			var http;
			try{
				http = new XMLHttpRequest;
				getXHR = function(){
					return new XMLHttpRequest;
				};
			} catch(e){
				var msxml = ['MSXML2.XMLHTTP.3.0',
							'MSXML2.XMLHTTP',
							'Miscrosoft.XMLHTTP'];
				for(var i = 0, len = msxml.length; i < len; ++i){
					try{
						http = new ActiveXObject(msxml[i]);
						getXHR = function(){
							return new ActiveXObject(msxml[i]);
						};
						break;
					} catch(e){
						
					}
				}
			}
			return http;
		};
		return function(method, url, callback, postData){
			var http = getXHR();
			http.open(method, uri, true);
			handleReadyState(http, callback);
			http.send(postData || null);
			return http;
		};
	}());
	
	Function.prototype.method = function(name, fn){
		this.prototype[name] = fn;
		return this;
	};
	if(!Array.prototype.forEach){
		Array.method('forEach', function(fn, thisObj){
			var scope = thisObj || window;
			for(var i = 0, len = this.length; i < len; ++i){
				fn.call(scope, this[i], i, this);
			}
		});
	}
	
	if(!Array.prototype.filter){
		Array.method('filter', function(fn, thisObj){
			var scope = thisObj || window;
			var a = [];
			for(var i = 0, len = this.length; i < len; ++i){
				if(!fn.call(scope, this[i], i, this)){
					continue;
				}
				a.push(this[i]);
			}
			return a;
		});
	}
	window.DED = window.DED || {};
	DED.util = DED.util || {};
	DED.util.Observer = function(){
		this.fns = [];
	}
	DED.util.Observer.prototype = {
		subscribe: function(fn){
			this.fns.push(fn);
		},
		unsubscribe: function(fn){
			this.fns = this.fns.filter(
				function(el){
					if(el !== fn){
						return el;
					}
				}
			);
		},
		fire: function(o){
			this.fns.forEach{
				function(el){
					el(o);
				}
			};
		}
	};
}());