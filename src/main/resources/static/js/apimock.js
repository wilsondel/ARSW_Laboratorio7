//
apimock=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[
	    {author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
	    {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"}];
	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"}];

	 mockdata["juanitaland"]=[{author:"juanitaland","points":[{"x":100,"y":140},{"x":115,"y":115}],"name":"home"},
     	 {author:"juanitaland","points":[{"x":100,"y":140},{"x":115,"y":115}],"name":"gear2"}];
     mockdata["wilsonland"]=[{author:"wilsonland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"home"},
     	 {author:"wilsonland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"}];
     mockdata["ikyland"]=[{author:"ikyland","points":[{"x":120,"y":120},{"x":120,"y":120}],"name":"ikyhouse"},
     	 {author:"ikyland","points":[{"x":120,"y":120},{"x":120,"y":120}],"name":"gear2"}];


	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(
				mockdata[authname]
			);

		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){

			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		}
	}


})();

//module.exports = { apimock}
//export default apimock
/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/