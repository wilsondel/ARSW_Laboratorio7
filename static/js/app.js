var apimock = apiclient;


app = (function(){

    function getBlueprintsAuthor() {
        var authorName = $('#name').val();
        if (authorName !== null || authorName !== "" ) {
            $('#table-body').empty();
            $("#title-table").text(authorName + "'s blueprints");
            apimock.getBlueprintsByAuthor(authorName,tableData);
        }
    }

    const tableData = function (data){
        const newDataTable = data.map(element => {
            return {
                name: element.name,
                points: element.points.length
            }
        })

        console.log(newDataTable);

        //
        newDataTable.map(element => {
            $("#table-body")
                .append($(
                    "<tr><td>" + element.name + "</td><td>" +
                    element.points.toString() + "</td><td>" +
                    "<button id='" + element.name + "' onclick='app.getBlueprintsAuthorAndName(this)'>open</button>" + "</td>" ));
        });

        const totalPoints = newDataTable.reduce((accumulator, { points }) => {
            return accumulator + points;
            },0);

        console.log(totalPoints);

        $("#user-points").text("Total user points: " + totalPoints);

    }



    function getBlueprintsAuthorAndName(data) {
        console.log(data)
        console.log(data.id)
        var authorName = $('#name').val();
        var blueprintName = data.id;
        $("#canva-title").text( "Current blueprint: " + blueprintName);
        apimock.getBlueprintsByNameAndAuthor(authorName,blueprintName,myBlueprint);
    }

    const myBlueprint = function (data) {
        // Obtener los puntos del objeto
        const puntos = data.points;


        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        // Limpiar el canvas y comenzar un nuevo trazo
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        // Mover la pluma al primer punto
        ctx.moveTo(puntos[0].x, puntos[0].y);


        for (let i = 1; i < puntos.length; i++) {
            const punto = puntos[i];
            ctx.lineTo(punto.x, punto.y);
        }

        // Dibujar una línea de regreso al primer punto para cerrar la forma
        ctx.lineTo(puntos[0].x, puntos[0].y);


        ctx.stroke();
    }


    return {
        getBlueprintsAuthor,
        getBlueprintsAuthorAndName,
    }

})();


