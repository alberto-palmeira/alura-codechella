const inputElements = document.querySelectorAll('[required]');
const compose = (...fns) => (x, ...restArgs) => fns.reduce((y, f) => f(y, ...restArgs), x);

inputElements.forEach(input => {
    if(input.name == 'birthDate') {
        input.addEventListener('blur', () => compose(hasValue, validateAge, setPermission, handleValidations)(input, 16, 15, 10));
    } else {
        input.addEventListener('blur', () => compose(hasValue, handleValidations)(input));
    }
  
    input.addEventListener('invalid', event => event.preventDefault());
})

function hasValue(input) {
    input.setCustomValidity('');
    
    if(input.checkValidity()) {
        return {
            status: 'valid',
            input: input
        }
    } 
    
    return {
        status: 'invalid',
        input: input
    }
}

function validateAge(object, ...ages) {
    const {status} = object;
    const {input} = object;

    const todayDate = new Date();
    const birthDate = age => {
        const birthDay = new Date(input.value);
        return new Date(birthDay.getUTCFullYear() + parseInt(`${age}`), birthDay.getUTCMonth(), birthDay.getUTCDate());
    }

    const validations = [];
    if(status == 'valid') {
        validations.push(ages.map(age => {
            if(todayDate < birthDate(age)) {
                return true;
            } else {
                return false;
            }
        }))
    } else {
        input.setCustomValidity('Custom Error');
    }

    return {
        status: status,
        ageValidations: validations,
        input: input
    }
}

function setPermission(object) {
    const {input} = object;
    const ageValidations = object.ageValidations.flat()

    if(ageValidations[0] === true && ageValidations[1] === false) {
        return {
            status: 'valid',
            input: input
        }
    }
    
    if(ageValidations[0] == true && ageValidations[1] == true && ageValidations[2] == false) {
        return {
            status: 'invalid',
            input: input,
            permission: 'allowed'
        }
    }
    
    if(ageValidations[0] == true && ageValidations[1] == true && ageValidations[2] == true) {
        input.setCustomValidity('Custom Error');
        
        return {
            status: 'invalid',
            input: input,
            permission: 'notAllowed'
        }
    }
}

function handleValidations(object) {
    const {status} = object;
    const {input} = object;

    const inputError = input.nextElementSibling;

    const messages = {
        name: {
            valueMissing: "O campo de nome não pode estar vazio.",
            tooShort: "Por favor, preencha seu nome e sobrenome.",
            patternMismatch: "Por favor, inclua somente letras em seu nome."
        },
        birthDate: {
            valueMissing: 'O campo de data de nascimento não pode estar vazio.',
            allowed: 'É necessário o acompanhamento de um responsável.',
            notAllowed: 'Não é permitida a presença de menores de 10 anos'
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

    const messagesProperties = ['valueMissing', 'tooShort', 'typeMismatch', 'patternMismatch'];

    if(status == 'valid') {
        inputError.textContent = '';
        input.classList.remove('form__input--invalid');
        input.setCustomValidity('');
    } else {
        messagesProperties.forEach(property => {
            if(input.validity[property]) {
                inputError.textContent = messages[input.name][property];
                input.classList.add('form__input--invalid');
            }
        })

    }

    if(object.permission && object.permission == 'allowed') {
        inputError.textContent = messages[input.name]['allowed'];
    }
    
    if(object.permission && object.permission == 'notAllowed') {
        inputError.textContent = messages[input.name]['notAllowed'];
        input.classList.add('form__input--invalid');
    }
}