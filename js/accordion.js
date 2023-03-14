const questions = document.querySelectorAll('.js-questions__container');

questions.forEach(question =>
    question.addEventListener('click', () => {
        question.nextElementSibling.classList.toggle('questions__answer--active')
}))
