export const displayAddedCustomerPopup = (docRef) => {
    const addCustomer = document.querySelector('.addedCustomer');
    addCustomer.innerHTML = `<p>Klient został dodany.<a href="/customer/${docRef.id}">Zobacz</a></p>`
    addCustomer.classList.add('active')

    setTimeout(() => {
        if (addCustomer) {
            addCustomer.classList.remove('active')
            addCustomer.innerHTML = ''
        } else {
            clearTimeout();
        }
    }, 5000)
}