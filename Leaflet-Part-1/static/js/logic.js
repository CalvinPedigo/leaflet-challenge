// Initialize the map
let map = L.map('map').setView([20, 0], 2);

// Add the tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Fetch the earthquake data from the USGS GeoJSON feed
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson').then(data => {

  // Add GeoJSON layer to the map
  L.geoJson(data, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng),
    style: feature => ({
      radius: getRadius(feature.properties.mag),
      fillColor: getColor(feature.geometry.coordinates[2]),
      opacity: 1,
      fillOpacity: 0.8,
      color: '#000',
      weight: 0.5
    }),
    onEachFeature: (feature, layer) => {
      const { mag, place } = feature.properties;
      const depth = feature.geometry.coordinates[2];
      layer.bindPopup(`<h3>Magnitude: ${mag}</h3><hr><p>Location: ${place}</p><p>Depth: ${depth}</p>`);
    }
  }).addTo(map);

  // Add legend to the map
  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'info legend');
    const depths = [-10, 10, 30, 50, 70, 90];
    const magnitudes = [0, 1, 2, 3, 4, 5];

    // Depth legend
    div.innerHTML = '<h4>Depth</h4>' + 
      depths.map((depth, i) => 
        `<i style="background:${getColor(depth + 1)}; width: 18px; height: 18px; display: inline-block;"></i> ${depth}${depths[i + 1] ? '&ndash;' + depths[i + 1] : '+'}`
      ).join('<br>');

    // Magnitude legend
    div.innerHTML += '<br><h4>Magnitude</h4>' + 
      magnitudes.map(magnitude => 
        `<i style="background: ${getColor(0)}; width: ${getRadius(magnitude) * 2}px; height: ${getRadius(magnitude) * 2}px; border-radius: 50%; display: inline-block; margin-right: 5px;"></i> ${magnitude}`
      ).join('<br>');

    return div;
  };

  legend.addTo(map);

  // Function to determine marker size
  function getRadius(magnitude) {
    return magnitude ? magnitude * 4 : 1;
  }

  // Function to determine the color
  function getColor(d) {
    return d > 90 ? '#0000FF' :
           d > 70 ? '#1E90FF' :
           d > 50 ? '#00BFFF' :
           d > 30 ? '#FFFF00' :
           d > 10 ? '#FFA500' :
                   '#FF4500';
  }
});