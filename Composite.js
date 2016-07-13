/*
	Composite
*/
(function(){
	var Composite new Interface('Composite', ['add', 'remove', 'getChild']);
	var GalleryItem = new Interface('GalleryItem', ['hide', 'show']);
	
	//DynamicGallery class
	var DynamicGallery = function(id){
		this.children = [];
		
		this.element = document.createElement('div');
		this.element.id = id;
		this.element.className = 'dynamic-gallery';
	}
	DynamicGallery.prototype = {
		add: function(child){
			Interface.ensureImplements(child, Composite, GalleryItem);
			this.children.push(child);
			this.element.appendChild(child.getElement());
		},
		remove: function(child){
			for(var node, i = 0; node = this.getChild(i); i++){
				if(node == child){
					this.children.splice(i, 1);
					break;
				}
			}
			this.element.removeChild(child.getElement());
		},
		getChild: function(){
			return this.children[i];
		},
		hide: function(){
			for(var node, i = 0; node = this.getChild(i); i++){
				node.hide();
			}
			this.element.style.display = 'none';
		},
		show: function(){
			this.element.style.display = 'block';
			for(var node, i = 0; node = this.getChild(i); i++){
				node.show();
			}
		},
		getElement: function(){
			return this.element;
		}
	};
	
	//GalleryImage class
	var GalleryImage = function(src){
		this.element = document.createElement('img');
		this.element.className = 'gallery-image';
		this.element.src = src;
	};
	
	GalleryImage.prototype = {
		/*
			this is the leaf node, so we don't implement these mothods, we just define them
		*/
		add: function(){},
		remove: function(){},
		getChild: function(){},
		
		//Implement the GalleryImage interface
		hide: function(){
			this.element.style.display = 'none';
		},
		show: function(){
			this.element.style.display = '';
		},
		getElement: function(){
			return this.element;
		}
	}
}();)