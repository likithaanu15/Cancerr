// Function to check if WebGL is supported
function isWebGLSupported() {
    try {
        const canvas = document.createElement('canvas');
        return !!window.WebGLRenderingContext && !!canvas.getContext('webgl');
    } catch (e) {
        return false;
    }
}

// WebGL Support Check
if (!isWebGLSupported()) {
    alert("WebGL is not supported on your browser or device.");
}

// Document ready
document.addEventListener('DOMContentLoaded', () => {

    // Clear button functionality to clear the gene name input field
    const clearButton = document.getElementById('clear-input');
    const geneInput = document.getElementById('gene_name');
    
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            geneInput.value = ''; // Clear the input field
            
            // Optionally, submit the form to reset the search results
            document.forms[0].submit();
        });
    }

   // Add functionality to show active tab content based on the selected tab
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove the 'active' class from all tabs and content
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add 'active' class to the clicked tab and the corresponding content
            tab.classList.add('active');
            const activeTab = tab.getAttribute('data-tab');
            document.getElementById(activeTab).classList.add('active');
        });
    });
});

    // Gene search input and suggestion box
    const geneNameInput = document.getElementById("gene_name");
    const suggestionBox = document.getElementById("suggestion-box");

    geneNameInput.addEventListener("input", () => {
        const query = geneNameInput.value.trim();
        suggestionBox.innerHTML = ""; // Clear previous suggestions

        if (query.length > 0) {
            // Send AJAX request to the server to fetch suggestions
            $.get("/suggestions", { query: query }, function (data) {
                if (data.length > 0) {
                    suggestionBox.style.display = "block";
                    data.forEach(gene => {
                        const suggestionItem = document.createElement("div");
                        suggestionItem.classList.add("suggestion-item");
                        suggestionItem.textContent = gene;

                        suggestionItem.addEventListener("click", () => {
                            geneNameInput.value = gene;
                            suggestionBox.style.display = "none"; // Hide suggestions
                        });

                        suggestionBox.appendChild(suggestionItem);
                    });
                } else {
                    suggestionBox.style.display = "none";
                }
            });
        } else {
            suggestionBox.style.display = "none";
        }
    });

    // Close suggestions if the user clicks outside the suggestion box
    document.addEventListener("click", (event) => {
        if (!suggestionBox.contains(event.target) && event.target !== geneNameInput) {
            suggestionBox.style.display = "none"; // Hide suggestions when clicking outside
        }
    });

   document.addEventListener('DOMContentLoaded', function() {
    const clearButton = document.getElementById('clear-input');

    if (clearButton) {
        clearButton.addEventListener('click', function() {
            // Clear all input fields inside a form
            const inputFields = document.querySelectorAll('form input');
            inputFields.forEach(input => {
                input.value = '';  // Clears each input field
            });
        });
    }
});


    // PDB file upload and 3D viewer initialization
    document.getElementById('pdbFileInput').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const pdbData = e.target.result;

                // Display the viewer div once a file is selected
                const viewer = document.getElementById('viewer');
                viewer.style.display = 'block';

                // Initialize the 3Dmol viewer
                const viewer3D = $3Dmol.createViewer("viewer", { backgroundColor: "white" });

                if (!viewer3D) {
                    console.error("Failed to initialize the viewer!");
                    return;
                }

                // Load the PDB data into the viewer
                viewer3D.addModel(pdbData, "pdb");
                viewer3D.setStyle({}, { cartoon: { color: 'spectrum' } }); // Apply cartoon style
                viewer3D.zoomTo(); // Adjust zoom to fit the model
                viewer3D.render(); // Render the 3D model
            };
            reader.readAsText(file); // Read the PDB file as text
        }
    });