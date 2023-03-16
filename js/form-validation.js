const inputElements = document.querySelectorAll('[required]');

inputElements.forEach(input => {
    input.addEventListener('blur', () => defineValidation(input));
    input.addEventListener('invalid', event => event.preventDefault());
})

function defineValidation(input) {
    const inputError = input.parentNode.querySelector('.js-form__error');
    
    if(input.name == 'birthDate') {
        isDate(input, inputError);
    } else {
        validateInput(input, inputError);
    }
}

function validateInput(input, inputError) {
    if(input.checkValidity()) {
        inputError.textContent = ''
        input.classList.remove('form__input--invalid');
    } else {
        input.setCustomValidity('');
        showError(input, inputError);
    }
}

function isDate(input, inputError) {
    if(input.value == '') {
        showError(input, inputError)
    } else {
        ageValidation(input, inputError);
    }
}

function ageValidation(input, inputError) {
    const todayDate = new Date();
    const birthDate = age => {
        const birthDay = new Date(input.value);
        return new Date(birthDay.getUTCFullYear() + parseInt(`${age}`), birthDay.getUTCMonth(), birthDay.getUTCDate());
    }

    if(todayDate < birthDate(16)) {
        inputError.textContent = 'É necessário ser maior de 16 anos.';
        input.classList.add('form__input--invalid');
    }
    
    if(todayDate <= birthDate(15) && todayDate >= birthDate(11)) {
        inputError.textContent = 'É necessário ser acompanhado de um responsável.';
        input.classList.add('form__input--invalid');
    }

    if(todayDate < birthDate(11)) {
        inputError.textContent = 'Não é possível ir.';
        input.classList.add('form__input--invalid');
        input.setCustomValidity('Custom Error');
    }

    if(todayDate >= birthDate(16)) {
        inputError.textContent = '';
        input.classList.remove('form__input--invalid');
        input.setCustomValidity('');
    }
}

function showError(input, inputError) {
    const mensagens = {
        name: {
            valueMissing: "O campo de nome não pode estar vazio.",
            tooShort: "Por favor, preencha seu nome e sobrenome.",
            patternMismatch: "Por favor, inclua somente letras em seu nome."
        },
        birthDate: {
            valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        },
        email: {
            valueMissing: "O campo de e-mail não pode estar vazio.",
            typeMismatch: "Por favor, preencha um email correto.",
            tooShort: "Inválido, seu e-mail é muito curto."
        },
        select: {
            valueMissing: "Escolha um dos tipos de ingressos.",
        },
        date: {
            valueMissing: 'O campo de data do show não pode estar vazio.'
        }
    };

    const errorsType = ['valueMissing', 'tooShort', 'typeMismatch', 'customError', 'patternMismatch'];

    errorsType.forEach(error => {
        if(input.validity[error]) {
            inputError.textContent = mensagens[input.name][error];
            input.classList.add('form__input--invalid');
        }
    })
}