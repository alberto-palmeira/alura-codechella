const form = document.querySelector('.js-form');

form.addEventListener('submit', event => {
    event.preventDefault();
    
    let buyInformation = '';

    if(form.querySelector('.js-form__date').textContent.length > 0) {
        buyInformation = {
            name: form.querySelector('input[name="name"]').value,
            email: form.querySelector('input[name="email"]').value,
            birthDate: form.querySelector('input[name="birthDate"]').value,
            disclaimer: form.querySelector('.js-form__date').textContent,
            ticket: form.querySelector('select[name="select"]').value,
            date: form.querySelector('select[name="date"]').value,
        }
    } else if(form.querySelector('.js-form__error').textContent.length == 0) {
        buyInformation = {
            name: form.querySelector('input[name="name"]').value,
            email: form.querySelector('input[name="email"]').value,
            birthDate: form.querySelector('input[name="birthDate"]').value,
            ticket: form.querySelector('select[name="select"]').value,
            date: form.querySelector('select[name="date"]').value,
        }
    }
        
    localStorage.setItem('codechella', JSON.stringify(buyInformation));
    window.location.href = '../checkout.html';
})