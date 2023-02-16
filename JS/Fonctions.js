

const uri = 'neo4j+s://0145f88d.databases.neo4j.io';
const user = 'neo4j';
const password = 'xBd9ZotdFoJXJ3MxyQY0qkuFeQT_W90WTeket8xemJ4';

// To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

try {

   findIngredients(driver);


} catch (error) {
    console.error(`Something went wrong: ${error}`);
} finally {
    // Don't forget to close the driver connection when you're finished with it.
    driver.close();
}

async function findIngredients(driver) {

    const session = driver.session({ database: 'neo4j' });

    try {
        const readQuery = `MATCH (n:Ingredient) RETURN n.name;`;

        const readResult = await session.executeRead(tx =>
            tx.run(readQuery)
        );

        readResult.records.forEach(record => {
            console.log(`Found ingredient: ${record.get('n.name')}`)
        });
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        await session.close();
    }
}

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


