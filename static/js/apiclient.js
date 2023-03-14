
var apiclient = (function(){

    function getBlueprintsByAuthor(author, callback){
        callback(
            JSON.parse($.ajax({type: 'GET', url: 'http://localhost:8080/blueprints/' + author, async: false}).responseText)
        )}


    function getBlueprintsByNameAndAuthor (author, bpname, callback){
        var authorAndName = author + "/" + bpname;
        callback(
            JSON.parse($.ajax({type: 'GET', url: 'http://localhost:8080/blueprints/' + authorAndName, async: false}).responseText)
        )}


    return {
        getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor
    }
})();