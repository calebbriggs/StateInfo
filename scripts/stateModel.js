
var stateModel = function(){
			this.chosenState = ko.observable();
			this.chosenCity = ko.observable();			
			this.cities = ko.observableArray([]);
			this.allZips = ko.observable(false);
			
			this.chosenState.subscribe(function(newValue){
					if(!newValue){ model.cities([]); return;}
					
					var info = this;
					info.cities([]);
						$.ajax({ 
							async: false, 
							url:  'http://gomashup.com/json.php?fds=geo/usa/zipcode/state/'+newValue.abbreviation, 
							dataType: "jsonp",
							success: function(data){
								if(!info.allZips()){
									var cities = _.uniq(data.result, false ,function(x){
										return x.City																
									});								
									cities = _.sortBy(cities, function(x){ return x.City});

									$.each(cities, function(i){ cities[i].displayname = cities[i].City})
									info.cities(cities);
								}
								else{
										var cities = data.result;
										$.each(cities, function(i){ cities[i].displayname = cities[i].City + " " + cities[i].Zipcode});
										cities = _.sortBy(cities, function(x){ return x.City});
										info.cities(cities);
								}
							}
						});
										
				}.bind(this));
				
				this.allZips.subscribe(function(newValue){
						if(!model.chosenState()){ return;};
						this.cities([]);
						var info = this;
						$.ajax({ 
							async: false, 
							url:  'http://gomashup.com/json.php?fds=geo/usa/zipcode/state/'+model.chosenState().abbreviation, 
							dataType: "jsonp",
							success: function(data){
								if(!newValue){
									var cities = _.uniq(data.result, false ,function(x){
										return x.City																
									});								
									cities = _.sortBy(cities, function(x){ return x.City});

									$.each(cities, function(i){ cities[i].displayname = cities[i].City})
									info.cities(cities);
								}
								else{
										var cities = data.result;
										$.each(cities, function(i){ cities[i].displayname = cities[i].City + " " + cities[i].Zipcode});
										cities = _.sortBy(cities, function(x){ return x.City});
										info.cities(cities);
								}
							}
						});
										
				}.bind(this));
};