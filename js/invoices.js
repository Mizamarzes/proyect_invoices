const invoicesList=[];

const updateClients=()=>{
    const clientSelect=document.getElementById('clientInvoice');
    clientSelect.innerHTML='';
    const optionsClients=generateOptionsClients();
    clientSelect.innerHTML=optionsClients;
}

const updateProducts=()=>{
    const productsSelect=document.getElementById('productsInvoice');
    productsSelect.innerHTML='';
    const optionsProducts=generateOptionsProducts();
    optionsProducts.innerHTML=optionsProducts;
}

const loadFormInvoices=()=>{
    const formInvoices=document.getElementById('invoice-form');
    formInvoices.innerHTML=`
        <form>
            <label for="dateInvoice">Date of Invoice:</label>
            <input type="date" id="dateInvoice" required>

            <label for="clientInvoice">Client:</label>
            <select id="clientInvoice" required>
                ${generateOptionsClients()}
            </select>

            <label for="productsFactura">Products:</label>
            <select id="productsInvoice" multiple required>
                ${generateOptionsProducts()}
            </select>

            <label for=quantityProduct>Quantity:</label>
            <input type="number" id="quantityProduct" required>

            <button type="button" onclick="addItemInvoice()">Add Item</button>

            <h3>Items of Invoice</h3>
            <ul id=list-items-invoice"></ul>

            <button type="button" onclick="createInvoice()">Create Invoice</button>
            <button type="button" onclick="showListInvoices()">Show List of Invoices</button>
        </form>
    `;
    const listadoFacturas=document.getElementById("invoice-list");
    listadoFacturas.style.display='none';
}

const generateOptionsClients=()=>{
    let options='';
    for(const client of clientsList){
        options+=`<option value="${client.id}">${client.name}</option>`;
    }
    return options;
}

const generateOptionsProducts=()=>{
    let options='';
    for(const product of productsList){
        options+=`<option value="${product.code}">${product.description}</option>`;
    }
    return options;
}

const addItemInvoice=()=>{
    const productSelect=document.getElementById('productsInvoice');
    const quantityInput=document.getElementById('quantityProduct');
    const listItems=document.getElementById('list-items-invoice');

    const selectedProductIndex=productSelect.selectedIndex;
    const quantity=quantityInput.value;

    if(selectedProductIndex === -1 || !quantity){
        alert("Please, select a product and it quantity");
        return;
    }

    const selectProduct=productsList[selectedProductIndex]
    const total=selectProduct.price*quantity;

    const li=document.createElement('li');
    li.textContent=`${selectProduct.description} - Quantity: ${quantity} - Total: ${total}`;
    listItems.appendChild(li);

    productSelect.selectedIndex=-1;
    quantityInput.value='';
}

const createInvoice=()=>{
    const dateInput=document.getElementById('dateInvoice');
    const clientSelect=document.getElementById('clientInvoice');
    const listItems=document.getElementById('list-items-invoice');

    const date=dateInput.value;
    const clientId=clientSelect.value;
    const itemsInvoice=[];
    let totalInvoice=0;

    for(const li of listItems.getElementsByTagName('li')){
        itemsInvoice.push(li.textContent);
        const quantityMatch=li.textContent.match(/quantity: (\d+)/);
        const subTotalMatch=li.textContent.match(/Total: (\d+)/);

        if(quantityMatch && subTotalMatch){
            const quantity=parseInt(quantityMatch[1]);
            const subtotal=parseInt(subTotalMatch[1]);
            totalInvoice+=subtotal;
        }
    }

    if(!date || !clientId || listItems.length===0){
        alert("Please, complete all of campos and add once item of the invoice.");
        return;
    }

    const client=clientsList.find(c=>c.id===parseInt(clientId));

        const newInvoice={
            date: date,
            client: client,
            items: itemsInvoice,
            total: totalInvoice
        };

        invoicesList.push(newInvoice);
        
        console.log("Invoice created: ", newInvoice);
        console.log("List of invoices: ", invoicesList)

        dateInput.value='';
        clientSelect.selectedIndex=0;
        listItems.innerHTML='';

        alert(`Invoice succesfully created! Total: ${totalInvoice}`);
}



console.log(invoicesList);