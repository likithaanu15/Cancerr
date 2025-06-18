document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
			
        });
    });
});
// Load JSON data
let data = [];
fetch('data.json') // Ensure data.json is in the same directory as your HTML file
    .then(response => response.json())
    .then(json => data = json);

// Add event listener to the search button
document.getElementById('search-button').addEventListener('click', () => {
    const searchValue = document.getElementById('search-box').value.toLowerCase();
    const results = data.filter(item => item.Protein_Name.toLowerCase().includes(searchValue));

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
    } else {
        results.forEach(item => {
            const card = `
                <div class="result-card">
                    <h2>${item.Protein_Name}</h2>
                    <p><strong>Gene Name:</strong> ${item.Gene_Name}</p>
                    <p><strong>Organism:</strong> ${item.Organism}</p>
                    <p><strong>Length:</strong> ${item.Length || 'N/A'}</p>
                    <p><strong>Mass:</strong> ${item.Mass}</p>
                </div>
            `;
            resultsContainer.innerHTML += card;
        });
    }
});
