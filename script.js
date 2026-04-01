// Initialize map
const map = L.map('map').setView([26.9124, 75.7873], 13); // Jaipur default

// Load map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// Get user location
navigator.geolocation.getCurrentPosition((pos) => {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;

  // Move map to user
  map.setView([lat, lng], 15);

  // Add marker for user
  L.marker([lat, lng]).addTo(map)
    .bindPopup("You are here")
    .openPopup();

  // 🔥 Dummy vendors (for demo)
  const vendors = [
    { name: "Pizza Van 🍕", lat: lat + 0.002, lng: lng + 0.002 },
    { name: "Taco Truck 🌮", lat: lat - 0.002, lng: lng - 0.001 },
    { name: "Coffee Cart ☕", lat: lat + 0.001, lng: lng - 0.002 }
  ];

  // Add vendor markers
  vendors.forEach(v => {
    L.marker([v.lat, v.lng]).addTo(map)
      .bindPopup(v.name);
  });

});
