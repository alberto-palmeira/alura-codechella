import ageValidation from "./form-validation.js";

const ticketInfo = JSON.parse(localStorage.getItem('codechella'));
const checkoutInfo = document.querySelector('.js-checkout__info');

checkoutInfo.innerHTML += 
`
    <h3 class="checkout__name">${ticketInfo.name}</h3>
    <p class="checkout__text">Ingresso ${defineTicketType(ticketInfo.ticket)}</p>
    <p class="checkout__text">Setor: ${defineSector(ticketInfo.ticket)}</p>
    <p class="checkout__text">Data: ${ticketInfo.date}</p>
    <p class="checkout__text">Local: São Paulo-SP</p>
    <p class="checkout__text checkout__disclaimer">${ticketInfo.disclaimer}</p>

`

function defineTicketType(ticket) {
    if(ticket == 'Pista Comum' || ticket == 'Cadeiras Térreo')
        return 'Comum';

    if(ticket == 'Pista Premium' || ticket == 'Cadeiras Superiores')
        return 'Premium';
}

function defineSector(ticket) {
    if(ticket == 'Pista Comum' || ticket == 'Pista Premium')
        return 'Pista';

    return ticket;
}