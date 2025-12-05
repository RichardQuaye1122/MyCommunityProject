// js/script.js
// Shared script for ALL pages (index.html, map.html, etc.)

document.addEventListener("DOMContentLoaded", () => {
  // ————— DARK MODE TOGGLE —————
  const toggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Load saved theme or respect system preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    if (toggle) toggle.checked = savedTheme === "dark";
  } else if (prefersDark) {
    html.setAttribute("data-theme", "dark");
    if (toggle) toggle.checked = true;
  }

  // Save theme on change
  if (toggle) {
    toggle.addEventListener("change", () => {
      const newTheme = toggle.checked ? "dark" : "light";
      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // ————— AOS ANIMATIONS (only on pages that use it) —————
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }
  

  // ————— LEAFLET MAP INITIALIZATION —————

  // Small map on homepage
  // Small map on homepage
const homeMapEl = document.getElementById("homeMap");
if (homeMapEl) {
  const map = L.map("homeMap").setView([5.6037, -0.1870], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  L.marker([5.6037, -0.1870]).addTo(map).bindPopup("<b>Pothole</b><br>Main Street").openPopup();
  // More markers...
  setTimeout(() => map.invalidateSize(), 100);
}


  // Full-screen map on map.html
const fullMapEl = document.getElementById("map");
if (fullMapEl) {
  const map = L.map("map", {
    zoomControl: true,
  }).setView([5.6037, -0.1870], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Force redraw
  setTimeout(() => map.invalidateSize(), 200);

  const markers = L.markerClusterGroup();

  const reports = [
    { lat: 5.6037, lng: -0.1870, title: "Deep Pothole", desc: "Near Accra Mall", status: "warning", up: 142, t: "2d" },
    { lat: 5.6140, lng: -0.2050, title: "Broken Street Light", desc: "Very dark at night", status: "error", up: 89, t: "5h" },
    { lat: 5.5910, lng: -0.1790, title: "Illegal Dumping", desc: "Growing pile", status: "error", up: 67, t: "1d" },
    { lat: 5.5700, lng: -0.2100, title: "Flooded Road", desc: "Cars stuck", status: "warning", up: 201, t: "3d" },
    { lat: 5.6300, lng: -0.1700, title: "Missing Manhole", desc: "Extremely dangerous!", status: "error", up: 312, t: "now" },
  ];

  reports.forEach((r) => {
    const badge = r.status === "error" ? "bg-red-500 text-white" : "bg-yellow-500 text-black";
    const marker = L.marker([r.lat, r.lng], {
      icon: L.divIcon({
        html: `<div class="bg-white dark:bg-gray-800 rounded-full w-11 h-11 flex items-center justify-center shadow-2xl border-4 border-white dark:border-gray-900">
                  <span class="text-3xl font-bold text-red-600">!</span></div>`,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
      }),
    }).bindPopup(`
      <div class="p-4 min-w-64">
        <h3 class="font-bold text-lg">${r.title}</h3>
        <p class="text-sm opacity-80 mt-1">${r.desc}</p>
        <div class="flex justify-between items-center mt-4 text-xs font-medium">
          <span class="px-3 py-1.5 rounded-full ${badge}">${r.status === "error" ? "Urgent" : "In Progress"}</span>
          <span>${r.t} • ${r.up} Upvotes</span>
        </div>
      </div>
    `);

    markers.addLayer(marker);
  });

  map.addLayer(markers);

  // --- FETCH USER LOCATION ---
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Center map on user
        map.setView([lat, lng], 15);

        // Optional: Add a marker for the user
        L.circleMarker([lat, lng], {
          radius: 10,
          fillColor: "#3b82f6",
          color: "#fff",
          weight: 2,
          fillOpacity: 0.9
        }).addTo(map).bindPopup("You are here").openPopup();
      },
      (err) => {
        console.error("Could not get location:", err.message);
      },
      { enableHighAccuracy: true }
    );
  } else {
    console.warn("Geolocation not supported by browser");
  }

  // My Location Button (still works)
  L.control.locate({
    position: "topleft",
    strings: { title: "Show my location" },
    flyTo: true
  }).addTo(map);
}

});