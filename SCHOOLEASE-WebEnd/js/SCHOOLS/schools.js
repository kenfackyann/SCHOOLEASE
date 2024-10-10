// Function to shuffle an array (Fisher-Yates Shuffle Algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('http://localhost:3001/univ/getUniv'); // Ensure the correct API endpoint
        const result = await response.json();
  
        if (result.success) {
            // Assuming the result.data contains two arrays
            const [universities] = result.data; // Extract the first array
  
            if (Array.isArray(universities)) {
                // Shuffle the universities array before displaying
                const shuffledUniversities = shuffleArray(universities);

                const schoolContainer = document.getElementById('schoolContainer');
                schoolContainer.innerHTML = ''; // Clear any existing content
              
                 
                 
                shuffledUniversities.forEach(school => {
                    console.log(school.image);
                    const schoolCard = `
                    <div class="school-card">
                        <div class="school-info">
                            <div class="school-logo">
                                <img src="../../img/public/${school.image}" alt="School Logo" class="school-logo-image" />
                            </div>
                            <div>
                                <h4>${school.university_name}</h4>
                                <p>${school.description || 'No description available'}</p>
                                <div class="school-details">
                                    <span>
                                        <span class="material-icons-sharp">location_on</span>${school.region} | ${school.location}</span>
                                    <span>
                                        <span class="material-icons-sharp">link</span><a href="${school.website}" target="_blank">Visit Website</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    schoolContainer.innerHTML += schoolCard;
                });
            } else {
                document.getElementById('schoolContainer').innerHTML = 'No universities found.';
            }
        } else {
            document.getElementById('schoolContainer').innerHTML = 'No universities found.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('schoolContainer').innerHTML = 'An error occurred while fetching schools.';
    }
});
