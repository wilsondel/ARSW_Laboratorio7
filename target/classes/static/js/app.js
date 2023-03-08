import apimock from "./apimock";


const app = function(){
    apimock().getBlueprintsByAuthor('juanitaland',() => {console.log("guenas")} );

//    return mapp = lista.map(function(blueprint));

}

app();


