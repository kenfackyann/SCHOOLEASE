document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const region = urlParams.get('region');
    const field = urlParams.get('field');
    const price = urlParams.get('price');
    const language = urlParams.get('language');

    try {
        const response = await fetch(`/api/filterUniversity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ region, field, price, language }) // Send criteria to the API
        });
        const result = await response.json();

        if (result.success) {
            const schools = result.data; // Extract the data array
            const schoolContainer = document.getElementById('schoolContainer');
            schoolContainer.innerHTML = ''; // Clear any existing content

            if (Array.isArray(schools) && schools.length) {
                schools.forEach(school => {
                    // Construct the image URL from the image name stored in the database
                    const imageUrl = `/images/${school.imageName || 'default.jpg'}`;

                    const schoolCard = `
                    <div class="school-card">
                        <div class="school-info">
                            <div class="school-logo">
                                <img src="${imageUrl}" alt="School Logo" class="school-logo-image" />
                            </div>
                            <div>
                                <h4>${school.university_name}</h4>
                                <p>${school.full_name}</p>
                                <div class="school-details">
                                    <span>
                                        <span class="material-icons-sharp">location_on</span>${school.region}</span>
                                    <span>
                                        <span class="material-icons-sharp">link</span><a href="${school.website}" target="_blank">Visit Website</a></span>
                                </div>
                            </div>
                        </div>
                        <div class="school-meta">
                            <div>
                                <p>${school.email}</p>
                                <p>${school.phone_number}</p>
                            </div>
                        </div>
                        <div><span class="material-icons-sharp">bookmark</span></div>
                    </div>
                    `;
                    schoolContainer.innerHTML += schoolCard;
                });
            } else {
                schoolContainer.innerHTML = 'No universities found.';
            }
        } else {
            schoolContainer.innerHTML = 'No universities found.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('schoolContainer').innerHTML = 'An error occurred while fetching schools.';
    }
});
