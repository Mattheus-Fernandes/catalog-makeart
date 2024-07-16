const allProducts = document.getElementById("allProducts")
const msgLoading = document.getElementById("msgLoading")
const wishList = document.getElementById("wishList")
const priceAll = document.getElementById("priceAll")
const makeRequest = document.getElementById("makeRequest")
const cartNumber = document.getElementById("cartNumber")

//Array de produtos
const shoppindCart = []

//Menu de pedidos
const menu = document.getElementById("menu")

//Btn mostrar menu
const btnRequest = document.getElementById("request")

//Btn fechar menu
const btnClose = document.getElementById("close")


setTimeout(async () => {

  const response = await fetch("http://191.252.205.55:3030/api/product")

  if (!response.ok) {
    throw new Error("Erro ao buscar os produtos")
  }

  const data = await response.json()

  let allCards = ""

  data.forEach(e => {

    const availableProductsTotal = e.amount - e.sales

    const card = createCard(e.urlImage, e.product, e.brand, e.price, availableProductsTotal)

    allCards += card

  })

  allProducts.innerHTML = allCards

  msgLoading.style.display = "none"

}, 3000)

//Captura os button dos cards
setTimeout(() => {
  
  const btnAdd = document.querySelectorAll("#btnAdd")
  
  btnAdd.forEach(btn => {
    
    btn.addEventListener("click", (e) => {
      //Array de pedidos carrinho
      const requestCart = []

      const card = e.target.closest("#card")
      const product = card.querySelector("h2").textContent
      const brand = card.querySelector("p").textContent
      const input = card.querySelector('input[type="text"]')
      const qty = input.value
      const priceText = card.querySelectorAll("p")[1].textContent
      const priceMatch = Number(priceText.match(/\d+/)[0])
    

      
      const pedido = {
        product, brand, qty, priceMatch
      }
      
      shoppindCart.push(pedido)
    
      input.value = "OK"

      wishList.innerHTML = '';

      shoppindCart.forEach(e => {

        const li = document.createElement("li")
        li.classList.add("flex", "items-center", "justify-between")
        
        const qty = document.createElement("p")
        
        const product = document.createElement("p")
        product.classList.add("mx-1")
        
        const brand = document.createElement("p")

        const price = document.createElement("p")

        const value = document.createElement("p")
        value.id = "value"

        qty.textContent = e.qty
        product.textContent = e.product 
        brand.textContent = e.brand
        price.textContent = `R$${e.priceMatch}`
        value.textContent = `R$${Number(e.qty) * e.priceMatch}`
        
        
        requestCart.push(Number(e.qty))
      
        const arrUnique = requestCart.reduce((acc, curr) => acc + curr, 0)
        cartNumber.textContent = arrUnique

        
        li.append(qty, product, brand, price, value)
        
        wishList.append(li)
        
      })
      
    })
  })
  
}, 4000)

btnRequest.addEventListener("click", () => {
  
  menu.style.left = "0"
  menu.style.transitionDuration ="0.7s"

  //Mostrar valor total a pagar
  const value = document.querySelectorAll("#value")
  const numbers = []

  value.forEach(e => {
    const value = Number(e.textContent.match(/\d+/)[0])
    numbers.push(value)
  })

  const sum = numbers.reduce((acc, curr) => acc + curr, 0)
  
  priceAll.textContent = `R$ ${sum}`

})

btnClose.addEventListener("click", () => {
  menu.style.left = "-100%"
  menu.style.transitionDuration ="0.7s"
  
})

makeRequest.addEventListener("click", () => {

  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  const formattedDate = `${day}/${month}`
  

  const message = shoppindCart.map(item => {
    return `Produto: ${item.product}, Marca: ${item.brand}, Quantidade: ${item.qty}, Preço: R$${item.priceMatch}`
  }).join("\n")

  const encodedString = encodeURIComponent(`Olá Makeart, tudo bem?!\nEsse é o meu pedido realizado pelo catálado dia ${formattedDate}\n\n${message}`)
  const phoneNumber = "+5532991370535"
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedString}`;

  makeRequest.href = whatsappLink
  
})


function createCard(src, product, brand, price, stock){

  const availabilityText = stock > 0 ? `<p class="text-sm text-slate-500">Disponíveis: ${stock}</p>` : `<p class="text-sm text-red-500">Indisponível</p>`

  const card = `
  <div id="card" class="w-2/5 md:w-1/5 h-auto md:h-auto p-2 bg-white rounded-md flex flex-col justify-around overflow-hidden">
    <img src="${src}">
    <div>
      <h2 class="font-bold">${product}</h2>
      <p>${brand}</p>
      <p>Valor: R$${price}</p>
      ${availabilityText}
      <div class="flex items-center mt-2">
        <i class="fa-solid fa-cart-shopping mr-2"></i>
        <input type="text" placeholder="Quantidade" class="bg-slate-200 w-full md:w-1/2 rounded border-2 border-purple-900 outline-none px-1">
      </div>
      <button id="btnAdd" class="bg-purple-900 text-white text-base py-1 px-2 mt-3 rounded cursor-pointer">Adicionar</button>
    </div>
  </div>
  `

  return card

}

function createTable(){
  
}
