

const uri = 'neo4j+s://0145f88d.databases.neo4j.io';
const user = 'neo4j';
const password = 'xBd9ZotdFoJXJ3MxyQY0qkuFeQT_W90WTeket8xemJ4';

// To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));


async function IngredientDunecategory(searchQuery, valCategory) {
    const session = driver.session({ database: 'neo4j' });

    try {
        const readQuery = `MATCH (n:Ingredient) RETURN n.name, n.food_group, n.picture_name LIMIT 100;`;

        const readResult = await session.executeRead(tx =>
            tx.run(readQuery)
        );

        let ingredients = []

        let tableDiv1 = document.getElementById("datas-div1");
        tableDiv1.innerHTML = ""
        let tr = "";

        if (((searchQuery == null || searchQuery == '') && (valCategory == null || valCategory == ''))) {
            ingredients = readResult
        } else {
            if (valCategory != null && valCategory != '' && valCategory != 'Tous') {
                ingredients.records = ingredients.records?.length > 0 ? ingredients.records.filter(record => record.get('n.food_group').toLowerCase().includes(valCategory.toLowerCase()))
                : readResult.records.filter(record => record.get('n.food_group').toLowerCase().includes(valCategory.toLowerCase()))
            } else if (valCategory === 'Tous') {
                ingredients = readResult
            }
            if (searchQuery != null && searchQuery != '') {
                ingredients.records = ingredients.records?.length > 0 ? ingredients.records.filter(record => record.get('n.name').toLowerCase().includes(searchQuery.toLowerCase())) 
                : readResult.records.filter(record => record.get('n.name').toLowerCase().includes(searchQuery.toLowerCase()))
            }
        }

        if (ingredients.records && ingredients.records.length > 0) {
            ingredients.records.forEach(record => {
                tr += `<tr id = "scrollup" onclick='IngredientsByClosestRelationships("${record.get('n.name')}")'>`
                tr += `<td><img src="./Image/icon_foods/${record.get('n.picture_name')}.jpeg" />&nbsp;&nbsp;${record.get('n.name')}</td><td>${record.get('n.food_group')}</td>`
                tr += `</tr>`
            });
            tableDiv1.innerHTML += tr
        } else {
            tableDiv1.innerHTML += "<div style='font-size: 20px; text-align: center; margin-top: 10px;'>Aucun ingredient</div>"
        }


    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        await session.close();
    }
}


async function GetAllCategory() {
    const session = driver.session({ database: 'neo4j' });

    try {
        const readQuery = `MATCH (n) 
        WHERE n.food_group IS NOT NULL
        RETURN DISTINCT "node" as entity, n.food_group AS food_group LIMIT 100
        UNION ALL 
        MATCH ()-[r]-() 
        WHERE r.food_group IS NOT NULL
        RETURN DISTINCT "relationship" AS entity, r.food_group AS food_group LIMIT 100;`;

        const readResult = await session.executeRead(tx =>
            tx.run(readQuery)
        );

        let tableDiv2 = document.getElementById("datas-div2");
        let tr = "";
        tr += `<option value='Tous'>Tous</option>`;
        readResult.records.forEach(record => {
            tr += `<option value='${record.get('food_group')}'>${record.get('food_group')}</option>`;
        });
        tableDiv2.innerHTML += tr;
        IngredientDunecategory("", "")
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        await session.close();
    }
}

async function IngredientsByClosestRelationships(ingredientName) {
    const session = driver.session({ database: 'neo4j' });

    try {
        const readQuery = `MATCH (i1:Ingredient {name:"${ingredientName}"})-[p:PAIRS_WITH]->(i2:Ingredient)
        RETURN i2.name, i2.food_group, i2.picture_name, p.affinity
        ORDER BY p.affinity DESC`;

        const readResult = await session.executeRead(tx =>
            tx.run(readQuery)
        );

        let tableDiv3 = document.getElementById("datas-div3");
        tableDiv3.innerHTML = ""
        let tr = "";

        if (readResult.records && readResult.records.length > 0) {
            readResult.records.forEach(record => {
                tr += `<tr href='#myAnchor'>`
                tr += `<td><img src="./Image/icon_foods/${record.get('i2.picture_name')}.jpeg" />&nbsp;&nbsp;${record.get('i2.name')}</td><td>${record.get('i2.food_group')}</td><td>${record.get('p.affinity')}</td><td><a style="cursor: pointer;" href="https://www.allrecipes.com/search?q=${record.get('i2.name')}" target="_blank"><i class="fa fa-external-link" style="font-size:24px"></i></a></td>`
                tr += `</tr>`
            });
            tableDiv3.innerHTML += tr
        } else {
            tableDiv3.innerHTML += "<div style='font-size: 20px; text-align: center; margin-top: 10px;'>Aucun ingredient</div>"
        }

    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        await session.close();
    }
}