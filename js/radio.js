document.addEventListener("DOMContentLoaded", async function () {
  const audioPlayer = document.querySelector("#audio-player");
  let currentlyPlayingCard = null;

  async function fetchStationDetails(stationName) {
    try {
      const response = await fetch(`https://radio.vpms.xyz/radio/${stationName}`);
      const data = await response.json();
      console.log("Station details:", data);
      return data;
    } catch (error) {
      console.error("Error fetching station details:", error);
      throw error;
    }
  }

  function createStationCard(station) {
    const card = document.createElement("div");
    card.className = "station-card bg-slate-900 p-0 rounded-xl shadow-xl relative overflow-hidden cursor-pointer transition-shadow hover:shadow-lg h-42 w-full";
    card.innerHTML = `
      <div class="station-image-container relative">
        <div class="image-zoom">
          <img src="${station[2]}" alt="${station[1]}" class="rounded-lg object-cover w-full">
        </div>
        <div class="play-overlay absolute inset-0 flex justify-center items-center transition-opacity opacity-10 bg-black bg-opacity-90 hover:opacity-80 cursor-pointer rounded-lg">
          <i class="fas fa-play text-white text-8xl rounded-lg"></i>
        </div>
        <h2 class="text-lg font-semibold text-white text-center" style="font-family: 'Quicksand', sans-serif;">${station[1]}</h2>
        <div class="gif-container absolute bottom-4 left-0 right-0 text-center" style="display: none;">
          <img src="./assets/ani.gif" alt="Equalizer" class="w-32 h-18 mx-auto mt-2">
        </div>
      </div>
      <audio id="${station[1]}">
        Your browser does not support the audio element.
      </audio>
    `;

    const playOverlay = card.querySelector(".play-overlay");
    const gifContainer = card.querySelector(".gif-container");
    const playIcon = playOverlay.querySelector("i");

    playOverlay.addEventListener("click", async () => {
      if (currentlyPlayingCard) {
        const otherGifContainer = currentlyPlayingCard.querySelector(".gif-container");
        const otherPlayIcon = currentlyPlayingCard.querySelector(".play-overlay i");
        otherPlayIcon.classList.replace("fa-pause", "fa-play");
        otherGifContainer.style.display = "none"; // Hide the GIF
      }

      if (!audioPlayer.paused && audioPlayer.src === station[3]) {
        audioPlayer.pause();
        gifContainer.style.display = "none"; // Hide the GIF
      } else {
        audioPlayer.src = station[3];
        audioPlayer.play();
        gifContainer.style.display = "block"; // Show the GIF
        playIcon.classList.replace("fa-play", "fa-pause");
        currentlyPlayingCard = card;
      }
    });

    return card;
  }

  function extractStationNameFromUrl() {
    const hash = window.location.hash;
    return hash.substring(1);
  }

  async function displayAllStations() {
    try {
      const stationName = extractStationNameFromUrl();
      const stationDetails = await fetchStationDetails(stationName);
      const stationGrid = document.getElementById("station-grid");

      stationDetails.forEach(station => {
        const stationCard = createStationCard(station);
        stationGrid.appendChild(stationCard);
      });
    } catch (error) {
      console.error("Error displaying stations:", error);
    }
  }

  await displayAllStations();
});
