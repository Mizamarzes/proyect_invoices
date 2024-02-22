const productsList=[];
function loadProductsExample() {
    for (let i =1; i <= 10; i++) {
        const newProduct = {
            code: faker.random.number({ min: 100000, max: 999999 }).toString(),
            description:faker.commerce.productName(),
            prize:parseFloat(faker.commerce.price(10, 100, 2))
        };

        productsList.push(newProduct);
    }
}

const loadFormProducts=()=>{
    const formProducts=document.getElementById('products-form');
    formProducts.innerHTML=`
        <form>
            <label for="idProduct">ID of product:</label>
            <input type="number" id="idProduct" required>
            <label for="nameProduct">Name of product:</label>
            <input type="text" id="nameProduct" required>
            <label for="price">Price of product:</label>
            <input type="text" id="priceProduct" required>
            <button type="button" onclick="createProduct()">Create Product</button>
            <button type="button" onclick="createProduct()">Show List of Products</button>
        </form>
    `;
    const listadoProducts=document.getElementById('products-list');
    listadoProducts.style.display='none'
}

const createProduct=()=>{
    const idInput=document.getElementById('idProduct');
    const ag
}

loadProductsExample();
loadFormProducts();
console.log(productsList);