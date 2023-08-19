import stationData from './stationData.js';

document.addEventListener("DOMContentLoaded", function () {
  const stationsContainer = document.getElementById("stations-container");

  stationData.forEach(station => {
    const stationCard = document.createElement("a");
    stationCard.href = `radio.html#${station.sid}`;
    stationCard.className = "rounded-xl overflow-hidden shadow-xl relative w-42 h-42 sm:w-48 sm:h-48";

    const image = document.createElement("img");
    image.className = "w-full object-cover";
    image.src = station.image_url;
    image.alt = station.station;

    const overlay = document.createElement("div");
    overlay.className = "absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 overflow-hidden";

    const overlayContent = document.createElement("div");
    overlayContent.className = "px-6 py-4 text-white scroll-m-1";

    const title = document.createElement("div");
    title.className = "font-bold text-lg mb-2";
    title.textContent = station.station;

    const description = document.createElement("p");
    description.className = "text-gray-300 text-base";
    description.textContent = station.description;

    overlayContent.appendChild(title);
    overlayContent.appendChild(description);
    overlay.appendChild(overlayContent);
    stationCard.appendChild(image);
    stationCard.appendChild(overlay);

    stationsContainer.appendChild(stationCard);
  });
});
