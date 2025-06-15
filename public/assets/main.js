console.log("main");

// API Key
const apiKey = "96b855fec4134c4f97713219251206";

// URL Link
async function getCurrentAstronomy(location = "Turin") {
  const apiUrl =
    `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}` +
    `&q=${encodeURIComponent(location)}&dt=today`;


// Fetching API Data
  try {
    const res   = await fetch(apiUrl);
    const data  = await res.json();

    const { name, country } = data.location;
    const { sunrise, sunset, moon_phase } = data.astronomy.astro;

    const info = document.getElementById("astronomy-info");
    if (!info) return;

// Content
    info.innerHTML = `
      <h1>Today's astronomy forecast for ${name}, ${country}</h1>
      <p>Sunrise: ${sunrise}</p>
      <p>Sunset:  ${sunset}</p>
      <p>Moon phase: ${moon_phase}</p>
    `;
    
// Error Logging
  } catch (err) {
    console.error(err);
  }
}

// Dropdown Menu Listener
document.addEventListener("DOMContentLoaded", () => {
  const select =
    document.querySelector('#location-select select') ||
    document.getElementById("location-select");

  getCurrentAstronomy(select.value);

  select.addEventListener("change", () =>
    getCurrentAstronomy(select.value)
  );
});
