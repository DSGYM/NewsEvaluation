import { validateURL } from "./validateURL";

function handleSubmit(event) {
  event.preventDefault();
  const err = document.getElementById("error");

  // Reset Error
  err.style.visibility = "hidden";
  err.innerHTML = "";
  // check what text was put into the form field
  let url = document.getElementById("url").value;
  if (!validateURL(url)) {
    err.innerHTML = "Please enter a valid URL";
    err.style.visibility = "visible";
    return;
  }

  fetch("//localhost:8081/sentiment-analysis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url })
  })
    .then(res => res.json())
    .then(function(res) {
      document.getElementById("polarity").innerHTML = res.polarity;
      document.getElementById("polarity_confidence").innerHTML =
        res.polarity_confidence;
      document.getElementById("subjectivity").innerHTML = res.subjectivity;
      document.getElementById("subjectivity_confidence").innerHTML =
        res.subjectivity_confidence;
      document.getElementById("text").innerHTML = res.text;
    })
    .catch(function(error) {
      err.style.visibility = "visible";
      err.innerHTML =
        "Something went wrong. Please try again in a few minutes.";
    });
}

export { handleSubmit };
