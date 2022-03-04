
  let abrir = $("#abrir-modal");  
  let cerrar = $("#cerrar-modal");
  let modal = $(".modal-container");
  $( ".bannerArriba" ).prepend( "<p>6 CUOTAS SIN INTERES EN TODOS LOS LOCALES </p>" ); 
  abrir.click(function () {
    modal.addClass("modal-active");   
  });

  cerrar.click(function () {
    modal.removeClass("modal-active");
  });


//AGREGAR ELEMENTOS
const productsEl = document.querySelector (".products")
const itemsCarrito = document.querySelector (".cart-items")
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
    

    
    
function renderProducts(){                                            
    products.forEach ( (product)=> {

       ( productsEl).innerHTML += `<div class ="item"> 
        <div class= "item-container">
        <div class= item-img> <img src="${product.imgSrc}"> </div>
        <div class="desc">
        <h2>${product.name}</h2>
        <h2>$${product.price} </h2>
       
       <p>
       ${product.description}
       </p>
    </div>
    <div class="add-to-wishlist" onclick="wishlist(${product.id})" >
        <img src="./icons/heart.png" alt="favoritos">
    </div>
    <div class="add-to-cart" onclick="addToCart(${product.id})" onclick="animacion (id)"  >
        <img src="./icons/bag-plus.png" alt="agregar al carrito">
    </div>
</div>
</div>

         `
    })};
         
    
    
 renderProducts()


 let carrito = JSON.parse(localStorage.getItem("CART")) || [];
 carritoNuevo()



 function addToCart (id) {
    //Saber si ya tengo el producto en el carrito 
    if(carrito.some((item)=> item.id === id)) {
        alert ("producto en carrito!")
        cambiarUnidades("mas",id);
    }
    else{
        const item = products.find((product)=> product.id === id )
        carrito.push({
            ...item, units: 1,}
            
        );
     
    }
    carritoNuevo()

   

    }

    function carritoNuevo() {
        renderCartItems();
     renderSubtotal();
     localStorage.setItem("CART", JSON.stringify(carrito));
     
    }
    

 // function render renderSubtotal() {}
function renderSubtotal(){
    let precioFinal =0
    let totalItems =0;

    carrito.forEach ((item)=> {
        precioFinal += item.price * item.units;
        totalItems += item.units;
    });
    subtotalEl.innerHTML=`Subtotal (${totalItems} items): $${precioFinal.toFixed(2)}`
    totalItemsInCartEl.innerHTML = totalItems;

}
   
      function renderCartItems() {
        itemsCarrito.innerHTML = ""; // 
         carrito.forEach((item) => {
           itemsCarrito.innerHTML += `
               <div class="cart-item">
                   <div class="item-info" onclick="sacarDelCarrito(${item.id})">
                       <img src="${item.imgSrc}" alt="${item.name}">
                       <h4>${item.name}</h4>
                   </div>
                   <div class="unit-price">
                       <small>$</small>${item.price}
                   </div>
                   <div class="units">
                       <div class="btn menos" onclick="cambiarUnidades('menos',${item.id})" > -</div>             
                       <div class="number">${item.units}</div>
                       <div class="btn mas" onclick="cambiarUnidades('mas',${item.id})">+</div>           
                   </div>
               </div>
             `;
         });
       }

    
     
       function cambiarUnidades (action,id) {
        let carritoActual= carrito.map ((item) => {
            let cantUnidades = item.units
           if (item.id === id) {
               if (action === "menos" && cantUnidades>0) {
                    console.log( [{... item, units : item.units-- - 1}]);
                }
                else if (action === "mas" && cantUnidades<item.stock) {
                    console.log( [{... item, units : item.units++ + 1}]);
               }
           }
           return {
               ...item,cantUnidades,
           };
         })
         carritoNuevo()
     } ;

     function sacarDelCarrito (id)
     {
     carrito =  carrito.filter ((item)=> item.id !== id);

     carritoNuevo()
     }

     let Arrwishlist = [];
     function wishlist (id) {

        
         let item = products.find((product)=>product.id=== id);
         Arrwishlist.push(item.name);
         console.log (Arrwishlist)

     }

    
     let container = $('#21')
     let URLJSON = "data/data.json"

        $("#adelanto").prepend('<button id="btn1" class = "btn1">  VER ADELANTOS </button>');

        $("#btn1").click( () =>
        
        {  $( ".btn1" ).remove();
          $.getJSON(URLJSON, function (respuesta,estado) {
            if (estado ==="success") {
                let misDatos = respuesta;
                console.log(misDatos);
                for ( const dato of misDatos){

                    container.prepend (` <div class ="item"> 
        <div class= "item-container">
        <div class= item-img> <img src="${dato.imgSrc}"> </div>
        <div class="desc">
        <h2>${dato.name}</h2>
        <h2>$${dato.price} </h2>
        <p>
       ${dato.description}
       </p>
       
    </div>
    
</div>
</div>

         `
        
                    )
                }
            }

        }
            )
        });
        
    /* Para eliminar un producto del carrito de forma definitiva, hay que apretar sobre su imagen */ 
    /* Como la funcion de VER ADELANTOS, se hace con AJAX en un archivo local, no corre bien en Chrome, por un parche de seguridad. En firefox, que no tiene ese parche, se ve la funcion.*/