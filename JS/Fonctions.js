var idcategory

function getAllIngredients() {
    // Appel a la base de donnée neo4j.
    // Faire une requête pour récuperer les données
}

function GetAllCategory() {

    $.ajax(
        {
            type: "get",
            url: "./GetAllCategory.php",
            success: function (data) {
                $('#div2').append(data);
                IngredientDunecategory("", "") 
            },
            error: function () {
                alert("Impossible de récuperer les catégories");
            }
        }

    )
}

function IngredientDunecategory(searchQuery, valCategory) {
    $.ajax(
        {
            type: "get",
            url: "./IngredientDunecategory.php",
            data: "valCategory=" + valCategory + "&searchQuery=" + searchQuery,
            success: function (data) {
                $('#div1').empty(data);
                $('#div3').empty(data);

                $('#div1').append(data);
                $('#div3').append(data);
            },
            error: function () {
                alert("Impossible de récuperer les ingredients");
            }
        }

    )
}


