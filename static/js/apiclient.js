
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


    function saveUpdate(author, bpname, newPoints,callback) {
        var authorAndName = author + "/" + bpname;
        var putPromise = $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/blueprints/' + authorAndName,
            data: newPoints,
            contentType:"application/json"
        });

        putPromise.then(
            function () {
                console.log("Author and Name: " + authorAndName)
                console.log("Points: " + newPoints)
                callback();
                console.info("OK");
            },
            function () {
                console.log("Author and Name: " + authorAndName)
                console.log("Points: " + newPoints)
                console.info("ERROR");
            });
        return putPromise;
    };

    function createBlueprint (bp,callback){
        var putPromise = $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/blueprints',
            data: bp,
            contentType:"application/json"
        });

        putPromise.then(
            function () {
                callback();
                console.info("OK");
            },
            function () {
                console.info("ERROR");
            });

    }

    function deleteBlueprint (author, bpname, callback){
        var authorAndName = author + "/" + bpname;
        var putPromise = $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/blueprints/'+ authorAndName,
        });

        putPromise.then(
            function () {
                callback();
                console.info("OK");
            },
            function () {
                console.info("ERROR");
            });

    }




    return {
        getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor,
        saveUpdate,
        createBlueprint,
        deleteBlueprint
    }
})();