const subBtn = document.getElementById("subscribe-button");
const unsubBtn = document.getElementById("unsubscribe-button");

subBtn.addEventListener("click", (event) => {
  subscribe();
});

unsubBtn.addEventListener("click", (event) => {
  unsubscribe();
});

function subscribe() {
  let el = document.getElementById("subscribe-field");
  const number = el.value;

  let data = {
    number: number,
  };

  fetch("https://asucic-gunshotdetection.com/api/sns/subscribe", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
}

function unsubscribe() {
  let el = document.getElementById("subscribe-field");
  const number = el.value;

  let data = {
    number: number,
  };

  fetch("https://asucic-gunshotdetection.com/api/sns/unsubscribe", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
}
