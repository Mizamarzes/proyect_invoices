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
            <label for="idProduct">Code of product:</label>
            <input type="number" id="idProduct" required>
            <label for="nameProduct">Name of product:</label>
            <input type="text" id="nameProduct" required>
            <label for="price">Price of product:</label>
            <input type="text" id="priceProduct" required>
            <button type="button" onclick="createProduct()">Create Product</button>
            <button type="button" onclick="showListProducts()">Show List of Products</button>
        </form>
    `;
    const listadoProducts=document.getElementById('products-list');
    listadoProducts.style.display='none'
}

const createProduct=()=>{
    const codeproductInput=document.getElementById('idProduct').value;
    const descriptionProductInput=document.getElementById('nameProduct').value;
    const priceProductInput=document.getElementById('priceProduct').value;

    const newProduct={
        code:codeproductInput,
        description:descriptionProductInput,
        price:priceProductInput
    }
    productsList.push(newProduct);

    codeproductInput.value='';
    descriptionProductInput.value='';
    priceProductInput.value='';

    alert("product succesfuly created");
    console.log(productsList);
}

const showListProducts=()=>{
    const formProducts=document.getElementById('products-form');
    const listadoProducts=document.getElementById('products-list');

    formProducts.style.display='none';
    listadoProducts.style.display='block';

    const ul=document.createElement('ul');

    for(const product of productsList){
        const li=document.createElement('li');
        li.textContent= `Code: ${product.code}, Description: ${product.description}, Price: ${product.price}`
        ul.appendChild(li);
    }

    listadoProducts.innerHTML='';
    listadoProducts.appendChild(ul);

    const backButton=document.createElement('button');
    backButton.textContent='Back to form';
    backButton.addEventListener('click', backToFormClients);
    listadoProducts.appendChild(backButton);
}

const backToFormClients=()=>{
    const clientsForm=document.getElementById('products-form');
    const listadoClients= document.getElementById('products-list');
    listadoClients.style.display='none';
    clientsForm.style.display='block';
}

console.log(productsList);