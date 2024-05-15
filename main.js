const allProducts = document.getElementById("allProducts")


async function fetchData(){
  
  try {
    
    const response = await fetch("https://api-painel-makeart.onrender.com/api/product")
    
    if(!response.ok){
      throw new Error("Erro ao buscar os produtos")
    }
    
    const data = await response.json()
    
    data.forEach(e => {
      const availableProductsTotal = e.amount - e.sales
      
      const card = document.createElement("div")
      card.classList.add("w-2/5", "h-3/5", "p-2", "bg-white", "rounded-md", "flex", "flex-col", "justify-around", "overflow-hidden")

      const img = document.createElement("img")
      img.src = e.urlImage

      const cardBody = document.createElement("div")

      const productName = document.createElement("h2")
      productName.classList.add("font-bold")
      productName.textContent = e.product

      const productBrand = document.createElement("p")
      productBrand.textContent = e.brand

      const productPrice = document.createElement("p")
      productPrice.textContent = `Valor: R$${e.price}`
  
      const availableProducts = document.createElement("p")
      availableProducts.classList.add("text-sm", "text-slate-500")

      if(availableProductsTotal == 0){
        availableProducts.textContent = "Indisponivel"
        availableProducts.classList.add("text-red-500")
      }else {
        availableProducts.textContent = `Disponíveis: ${availableProductsTotal}`
      }


      cardBody.append(productName, productBrand, productPrice, availableProducts)

      card.append(img, cardBody)

     allProducts.appendChild(card)
      
    })

   

   

  }catch(error){
    console.log(error)
  }

}


fetchData()



fetch("https://api-painel-makeart.onrender.com/api/product")
.then(data => data.json())
.then(res => console.log(res))



console.log("foda")