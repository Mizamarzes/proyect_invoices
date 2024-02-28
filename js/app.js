document.addEventListener('DOMContentLoaded',async()=>{
    
    // Customer Module
    await loadClients();
    loadFormClients();

    // Products Module
    await loadProducts();
    loadFormProducts();

    //Invoices Module
    await loadInvoices();
    loadFormInvoices();
    
})