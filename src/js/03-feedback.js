// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

const userFeedback = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

const fillFeedbackFormField = () => {
  const userFeedbackFromLS = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (userFeedbackFromLS === null) {
    return;
  }
  for (const key in userFeedbackFromLS) {
    if (userFeedbackFromLS.hasOwnProperty(key)) {
      feedbackFormEl.elements[key].value = userFeedbackFromLS[key];
    }
  }
};

fillFeedbackFormField();

const onFeedbackFormFieldInput = ({ target: feedbackFormField }) => {
  const feedbackFormFieldValue = feedbackFormField.value;
  const feedbackFormFieldName = feedbackFormField.name;

  userFeedback[feedbackFormFieldName] = feedbackFormFieldValue;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(userFeedback));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();
  console.log(userFeedback);
  feedbackFormEl.reset();
  localStorage.removeItem(STORAGE_KEY);
};

console.log(userFeedback);

feedbackFormEl.addEventListener(
  'input',
  throttle(onFeedbackFormFieldInput, 500)
);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
