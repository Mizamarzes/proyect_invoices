const clientsList=[];
const loadClients=()=>{
    for(let i=0; i<=10;i++){
        const newClient={
            id:i,
            name:faker.name.findName(),
            age: Math.floor(Math.random*30)+18,
            email: faker.internet.email()
        };
        clientsList.push(newClient);
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

const createClient=()=>{
    const nameInput=document.getElementById('nameClient');
    const ageInput=document.getElementById('ageClient');
    const emailInput=document.getElementById('emailClient');

    const name=nameInput.value;
    const age=ageInput.value;
    const email=emailInput.value;

    const newClient={
        id:clientsList.length+1,
        name:name,
        age:age,
        email:email
    }
    clientsList.push(newClient)

    nameInput.value='';
    ageInput.value='';
    emailInput.value='';

    alert("customer successfuly created");
    console.log(clientsList);

}

const showListClient=()=>{
    const formClients = document.getElementById('clients-form');
    const listadoClients= document.getElementById('clients-list');
    
    formClients.style.display='none';
    listadoClients.style.display='block';

    const ul=document.createElement('ul');

    for(const client of clientsList){
        const li=document.createElement('li')
        li.textContent= `ID: ${client.id}, Name: ${client.name}, Age: ${client.age}, Email: ${client.email}`
        ul.appendChild(li);
    }

    listadoClients.innerHTML='';
    listadoClients.appendChild(ul);

    const backButton=document.createElement('button');
    backButton.textContent='Back to form';
    backButton.addEventListener('click', backToForm);
    listadoClients.appendChild(backButton);

}

const backToForm=()=>{
    const clientsForm=document.getElementById('clients-form');
    const listadoClients= document.getElementById('clients-list');
    listadoClients.style.display='none';
    clientsForm.style.display='block';
}


console.log(clientsList);

