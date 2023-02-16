<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/87f52fdadc.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./CSS/home.css">
    <script src="./JS/Fonctions.js"></script>
    <script src="./JS/JQuery 3.6.1.js"></script>
    <script src="./JS/db.js"></script>

    <script>
        $(document).ready(function(){
            $(
                function () 
                {
                    GetAllCategory();  
                }
                
            ),
            $('#search').keyup(
                function(){
                    $('#result_search').html('');
                    var ingredient = $(this).val();

                    if(ingredient != ""){  
                        IngredientDunecategory(encodeURIComponent(ingredient), '')
                    }else{
                        document.getElementById('result_search').innerHTML ="<div style='font-size: 20px; text-align: center; margin-top: 10px; color:#F5F5F5'>Aucun ingredient</div>";
                    }
                    
                    
                }
            );
        });
        
    </script>

</head>
<body>

<header>
    <nav class="navbar  navbar-dark bg-dark ">
        <div >
                <h1> FoodParing</h1>
        </div>
    </nav>
</header> 

<main class="im">
    <section class="py-5">
        <div class="container">
            <form class="d-flex ">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search">
                <button class="btn btn-outline-info" type="submit">Search</button> 
            </form>
            <div id="result_search">

            </div>
        </div>
    </section>
</main>

<section id="principal" class="py-5">
        <div class="container">
            <div  id="div2" class="col-12 col"></div>

            <div class="row gy-4 gy-md-0" >
                    <div class="col-12 col-md-6" id="div1"></div>
                        
                    <div class="col-12 col-md-6" id="div3"></div>

            </div>
              
        </div>
   </section>
   

<!-- Bootstrap JS bundle →

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script> -->
</body>
</html>





