import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

function reports() {
  //
}

function screenshot_htmlcss() {
  axios.post("/screenshots/htmlcss", {});
  //
}
