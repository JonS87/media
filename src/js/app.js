import { parseCoordinates } from "./geoparce";

const messageList = document.querySelector(".message-list");
const inputMessega = document.querySelector("#message-line");
const addGeoWindow = document.querySelector(".add-geo-window");
const cancelButton = document.querySelector(".cancel");
const okButton = document.querySelector(".ok");
const inputGeo = document.querySelector("#geo");

let message;
let messageTime;

const getGeo = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const coodrs = {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        };

        render(coodrs);
      },
      () => {
        addGeoWindow.classList.remove("hidden");
      },
      { enableHighAccuracy: true },
    );
  } else {
    addGeoWindow.classList.remove("hidden");
  }
};

const render = (coodrs) => {
  const row = document.createElement("div");
  row.className = "row";
  const span = document.createElement("span");
  span.className = "message";
  span.textContent = message;
  row.append(span);

  const stamp = document.createElement("div");
  stamp.className = "stamp";

  const geo = document.createElement("span");
  geo.className = "timeline";

  geo.textContent = `[${coodrs.latitude}, -${coodrs.longitude}]`;
  stamp.append(geo);

  const pic = document.createElement("img");
  pic.src = require("../svg/eye.png").default;
  pic.alt = "Глаз";
  stamp.append(pic);

  const time = document.createElement("div");
  time.className = "message-time";
  time.textContent = messageTime;

  row.append(stamp);
  row.append(time);

  messageList.prepend(row);
};

const getFormattedTime = () => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

cancelButton.addEventListener("click", () => {
  addGeoWindow.classList.add("hidden");
  inputMessega.focus();
});

okButton.addEventListener("click", () => {
  const geo = inputGeo.value.trim();

  if (geo) {
    const coodrs = parseCoordinates(geo);

    render(coodrs);

    addGeoWindow.classList.add("hidden");
    inputMessega.focus();
  }
});

inputMessega.focus();
inputMessega.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    message = inputMessega.value.trim();
    messageTime = getFormattedTime();

    if (message) {
      inputMessega.value = "";

      getGeo();
    }
  }
});
