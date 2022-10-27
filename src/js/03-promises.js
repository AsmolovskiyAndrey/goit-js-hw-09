import Notiflix from 'notiflix';

let getEl = selector => document.querySelector(selector);

getEl('button').addEventListener('click', onStartFunc);
getEl('.form').addEventListener('input', onInputFunc);

data = { delay: 0, step: 0, amount: 0 };

function onStartFunc(evt) {
  evt.preventDefault();
  let inDelay = data.delay;
  for (let i = 1; i <= data.amount; i++) {
    createPromise(i, inDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    inDelay += data.step;
  }
}

function onInputFunc(evt) {
  data[evt.target.name] = Number(evt.target.value);
}


function createPromise(position, delay) {
    let promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        }
        reject({ position, delay });
      }, delay);
    });
    return promise;
};
