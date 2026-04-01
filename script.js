const res = await fetch(`https://your-backend.onrender.com/vendors?lat=${lat}&lng=${lng}`);
const vendors = await res.json();

vendors.forEach(v => {
  L.marker([v.location.coordinates[1], v.location.coordinates[0]])
    .addTo(map)
    .bindPopup(v.name);
});
