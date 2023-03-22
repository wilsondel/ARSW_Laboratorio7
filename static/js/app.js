var apimock = apiclient;


app = (function(){

    var myPoints = [];
    var authorName = "";
    var blueprintName = "";
    var newBlueprintName = "";

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
        authorName = $('#name').val();
        blueprintName = data.id;
        $("#canva-title").text( "Current blueprint: " + blueprintName);
        apimock.getBlueprintsByNameAndAuthor(authorName,blueprintName,myBlueprint);
    }

    const myBlueprint = function (data) {
        myPoints=[];
        // Obtener los puntos del objeto
        const puntos = data.points;

        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        // Limpiar el canvas y comenzar un nuevo trazo
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        // Mover la pluma al primer punto
        ctx.moveTo(puntos[0].x, puntos[0].y);
        let punto =  {x:puntos[0].x,y:puntos[0].y}
        myPoints.push(punto);
        console.log("DATOS DEL API: " + puntos[0].x, puntos[0].y)

        for (let i = 1; i < puntos.length; i++) {
            const punto = puntos[i];
            ctx.lineTo(punto.x, punto.y);
            myPoints.push(punto);
        }

        // Dibujar una línea de regreso al primer punto para cerrar la forma
        ctx.lineTo(puntos[0].x, puntos[0].y);


        ctx.stroke();
    }


    function init (){
        positionX = 0;
        positionY = 0;

        const canvas = document.getElementById("myCanvas");
                const context = canvas.getContext("2d");

        var rect = canvas.getBoundingClientRect();
        if(window.PointerEvent) {
            canvas.addEventListener("pointerdown", function(event){
//            alert('pointerdown at '+event.pageX+','+event.pageY);
            positionX = event.clientX - rect.left;
            positionY = event.clientY - rect.top;
            savePoints(positionX,positionY);

            });
        }
        else {
            canvas.addEventListener("mousedown", function(event){
//                    alert('mousedown at '+event.clientX+','+event.clientY);
            positionX = event.clientX - rect.left;
            positionY = event.clientY - rect.top;
            savePoints(positionX,positionY);


            });
        }
    }

    // add points
    function savePoints(positionX, positionY) {
        let punto =  {x:positionX,y:positionY}
        myPoints.push(punto);
        console.log("Formato de puntos: " + punto.x)
        console.log("Formato de puntos: " + punto.y)
        draw()
    }

    function draw() {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(myPoints[0].x, myPoints[0].y);

        for (let i = 1; i < myPoints.length; i++) {
            const punto = myPoints[i];
            ctx.lineTo(punto.x, punto.y);
        }

        // Dibujar una línea de regreso al primer punto para cerrar la forma
        ctx.lineTo(myPoints[0].x, myPoints[0].y);


        ctx.stroke();
    }

    function saveUpdate() {
        if (newBlueprintName !== "" || newBlueprintName != null ) {
            var bp = JSON.stringify({author:authorName,name:newBlueprintName,points:myPoints});
            apimock.createBlueprint(bp,getBlueprintsAuthor)
            console.log("Esta entrando aqui" + newBlueprintName)
            newBlueprintName = "";
        } else {
            var myData = JSON.stringify({author:authorName,name:blueprintName,points:myPoints});
            apimock.saveUpdate(authorName, blueprintName, myData, getBlueprintsAuthor)
        };
    }


    function create() {
        newBlueprintName = prompt("New Blueprint Name: ");
    };


    function deletee() {
        const canvas = document.getElementById("myCanvas"),
        contex = canvas.getContext("2d");
        contex.clearRect(0, 0, canvas.width, canvas.height);
        contex.restore();
        contex.beginPath();
        apimock.deleteBlueprint(authorName, blueprintName,getBlueprintsAuthor);
    }




    return {
        getBlueprintsAuthor,
        getBlueprintsAuthorAndName,
        init,
        saveUpdate,
        create,
        deletee
    }

})();


