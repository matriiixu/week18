var feedURL = "https://www.metaweather.com/api/location/12723/";

$(document).on('pagecreate', '#feedPage', function(event) {
	
    
    function todayDate(){
        var today = new Date();  
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        
        if(dd<10){
           dd = "0" + dd;
        }
        if(mm<10){
           mm = "0" + mm;
        }
        return today = yyyy + "-" + mm + "-" + dd;
    }
    var today = todayDate();
    
    
    
    
	// Use an HTML GET request to obtain data from an API
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", feedURL, false);
	xmlhttp.send();
		
		
	// parse the resulting JSON into Javascript Data Object 
	// you can use a live parser to inspect the contents of the JSON
	// http://json.parser.online.fr/ 
	var weather= JSON.parse(xmlhttp.responseText);
	
	
	//Define Ractive binding
	var ractive = new Ractive({
    	el: 'container', <!-- where -->
    	template: '#myTemplate', <!-- how -->
    	data: 
        { weather : weather.consolidated_weather,  // what - specify the list of weather reports using dot notation
            format: function(num){return num.toFixed(1)},
            format2: function(todDate){
                if(today == todDate){
                    return todDate = "Today!";
                }else{
                    return todDate;
                }
            }
        }
	});
    $("#container").listview("refresh");
	
});
