const subBtn = document.getElementById("subscribe-button");
const unsubBtn = document.getElementById("unsubscribe-button");
const subToast = document.getElementById("gunshot-sub");
const unsubToast = document.getElementById("gunshot-unsub");

subBtn.addEventListener("click", (event) => {
  subscribe();
});

unsubBtn.addEventListener("click", (event) => {
  unsubscribe();
});

function subscribe() {
  console.log("CLICKED");
  let el = document.getElementById("subscribe-field");
  const number = el.value;

  let data = {
    number: number,
  };

  fetch("http://localhost:8080/api/sns/subscribe", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let subAlert = new bootstrap.Toast(subToast); //inizialize it
      subAlert.show();
    });
}

function unsubscribe() {
  let el = document.getElementById("subscribe-field");
  const number = el.value;

  let data = {
    number: number,
  };

  fetch("http://localhost:8080/api/sns/unsubscribe", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let subAlert = new bootstrap.Toast(unsubToast); //inizialize it
      subAlert.show();
    });
}
