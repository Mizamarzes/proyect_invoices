const productsList=[];

const loadProducts=async()=>{
    try{
        productsList.length=0;
        const response=await fetch('http://localhost:3000/products');

        if(!response.ok){
            throw new Error(`Error loading products, status: ${response.status}`);
        }
        const products=await response.json();
        productsList.push(...products);
    }catch(error){
        console.error(`Error loading products, ${error.message}`);
    }
}

const saveProduct= async(newProduct)=>{
    try{
        const response=await fetch('http://localhost:3000/products',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newProduct),
        });
        
        if(!response.ok){
            throw new Error(`Error saving product, status: ${response.status}`);
        }
        const productCreated= await response.json();
        console.log(`Created product: ${productCreated}`);

    }catch(error){
        console.log(`Error saving product ${error.message}`);
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
    listadoProducts.style.display='none';
}

const createProduct=async()=>{
    const codeproductInput=document.getElementById('idProduct').value;
    const descriptionProductInput=document.getElementById('nameProduct').value;
    const priceProductInput=document.getElementById('priceProduct').value;

    if (!codeproductInput || !descriptionProductInput || !priceProductInput) {
        alert('Please, complete all of places.');
        return;
    }

    const newProduct={
        id:productsList.length+1,
        code:codeproductInput,
        description:descriptionProductInput,
        price:priceProductInput
    }
    await saveProduct(newProduct);
    await loadProducts();
    console.log(`Product created: ${newProduct}`);
    console.log(`List of products ${productsList}`);

    codeproductInput.value='';
    descriptionProductInput.value='';
    priceProductInput.value='';

    alert("product succesfuly created");
    updateProducts();

    return newProduct
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
    backButton.addEventListener('click', backToFormProducts);
    listadoProducts.appendChild(backButton);
}

const backToFormProducts=()=>{
    const productsForm=document.getElementById('products-form');
    const listadoProducts= document.getElementById('products-list');
    listadoProducts.style.display='none';
    productsForm.style.display='block';
}

