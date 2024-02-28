const clientsList=[];

const loadClients=async()=>{
    try{
        clientsList.length=0;
        const response=await fetch('http://localhost:3000/clients');

        if(!response.ok){
            throw new Error(`Error loading customers, status: ${response.status}`);

        }
        const clients=await response.json();
        clientsList.push(...clients);

    }catch(error){
        console.error(`Error loading customers ${error.message}`);
    }
}

const saveClient=async(newClient)=>{
    try{
        const response=await fetch('http://localhost:3000/clients',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newClient),
        });

        if(!response.ok){
            throw new Error(`Error to create client, status: ${response.status}`);
        }
        const clientCreated=await response.json();

        console.log(`Client created: ${clientCreated}`); 

    }catch(error){
        console.error(`Error loading customers ${error.message}`);
    }
}

const loadFormClients=()=>{
    const formClients = document.getElementById('clients-form');
    formClients.innerHTML=`
        <form>
            <label for="nameClient">Name of client:</label>
            <input type="text" id="nameClient" required>
            <label for="ageClient">Age of client:</label>
            <input type="number" id="ageClient" required>
            <label for="emailClient">Email of client:</label>
            <input type="email" id="emailClient" required>
            <button type="button" onclick="createClient()">Create Client</button>
            <button type="button" onclick="showListClient()">Show List of Clients</button>
            <!-- here, you can add other functions, than modify and delete clients -->
        </form>
    `; 
    const listadoClients= document.getElementById('clients-list');
    listadoClients.style.display='none'
}

const createClient=async()=>{
    const nameInput=document.getElementById('nameClient').value;
    const ageInput=document.getElementById('ageClient').value;
    const emailInput=document.getElementById('emailClient').value;

    const newClient={
        id:clientsList.length+1,
        name:nameInput,
        age:ageInput,
        email:emailInput
    }
    
    await saveClient(newClient);
    await loadClients();

    nameInput.value='';
    ageInput.value='';
    emailInput.value='';

    alert("customer successfuly created");
    
    updateClients();

    return newClient
}

const showListClient=async()=>{
    await loadClients();
    const formClients = document.getElementById('clients-form');
    const listadoClients= document.getElementById('clients-list');
    
    formClients.style.display='none';
    listadoClients.style.display='block';

    const ul=document.createElement('ul');

    for(const client of clientsList){
        const li=document.createElement('li');
        li.textContent= `ID: ${client.id}, Name: ${client.name}, Age: ${client.age}`
        ul.appendChild(li);
    }

    listadoClients.innerHTML='';
    listadoClients.appendChild(ul);

    const backButton=document.createElement('button');
    backButton.textContent='Back to form';
    backButton.addEventListener('click', backToFormClients);
    listadoClients.appendChild(backButton);

}

const backToFormClients=()=>{
    const clientsForm=document.getElementById('clients-form');
    const listadoClients= document.getElementById('clients-list');

    listadoClients.style.display='none';
    clientsForm.style.display='block';
}

console.log(clientsList)



