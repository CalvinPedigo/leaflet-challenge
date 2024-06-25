# leaflet-challenge
UofU Module 15 Challenge - Leaflet
 In this challenge, we develop a way to visualize USGS data by using markers on a map to show earthquake sizes and their magnitudes.

The "Static" folder houses the actual code. The "Images" Folder was provided by eDX to show examples of the work.

 Unoriginal Code: ChatGPT was used to help stylize the legend to include magnitude sizes:
     // Magnitude legend
    div.innerHTML += '<br><h4>Magnitude</h4>' + 
      magnitudes.map(magnitude => 
        `<i style="background: ${getColor(0)}; width: ${getRadius(magnitude) * 2}px; height: ${getRadius(magnitude) * 2}px; border-radius: 50%; display: inline-block; margin-right: 5px;"></i> ${magnitude}`
      ).join('<br>');

    return div;
  };
