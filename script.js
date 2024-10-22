document.getElementById('fileInput').addEventListener('change', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const csvData = event.target.result;
            parseCSV(csvData);
        };
        reader.readAsText(file);
    } else {
        alert('Please select a file first.');
    }
});

const foodData = []; // Array to hold the food data

function parseCSV(data) {
    const rows = data.split('\n').slice(1); // Skip header
    const tableBody = document.querySelector('#foodTable tbody');
    tableBody.innerHTML = ''; // Clear previous data
    foodData.length = 0; // Clear previous food data

    rows.forEach(row => {
        const columns = row.split(',');
        if (columns.length === 3) {
            foodData.push(columns); // Store data in array
            const newRow = tableBody.insertRow();

            newRow.insertCell(0).innerText = columns[0]; // Food Item
            newRow.insertCell(1).innerText = columns[1]; // Carbs
            newRow.insertCell(2).innerText = columns[2]; // Serving Size
        }
    });
}

// Search functionality
document.getElementById('searchInput').addEventListener('keyup', () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const tableBody = document.querySelector('#foodTable tbody');
    tableBody.innerHTML = ''; // Clear the table

    foodData.forEach(item => {
        const foodItem = item[0].toLowerCase(); // Get food item in lowercase
        if (foodItem.includes(searchTerm)) {
            const newRow = tableBody.insertRow();
            newRow.insertCell(0).innerText = item[0]; // Food Item
            newRow.insertCell(1).innerText = item[1]; // Carbs
            newRow.insertCell(2).innerText = item[2]; // Serving Size
        }
    });
});
