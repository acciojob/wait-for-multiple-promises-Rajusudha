//your JS code here. If required.
// Function to create a promise that resolves after a random time between min and max seconds
function createRandomPromise(min, max) {
    const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(randomTime);
        }, randomTime * 1000);
    });
}

// Array to hold the promises
const promises = [
    createRandomPromise(1, 3),
    createRandomPromise(1, 3),
    createRandomPromise(1, 3)
];

// Initial table population with loading text
const table = document.getElementById("myTable");
const loadingRow = table.insertRow();
const loadingCell = loadingRow.insertCell();
loadingCell.colSpan = 2;
loadingCell.textContent = "Loading...";

// Using Promise.all to wait for all promises to resolve
Promise.all(promises)
    .then(results => {
        // Remove loading text
        table.deleteRow(0);
        
        // Populate table with the resolved values
        results.forEach((time, index) => {
            const row = table.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            cell1.textContent = `Promise ${index + 1}`;
            cell2.textContent = `${time}`;
        });
        
        // Calculate and display total time taken
        const totalTime = results.reduce((acc, curr) => acc + curr, 0);
        const totalRow = table.insertRow();
        const totalCell1 = totalRow.insertCell();
        const totalCell2 = totalRow.insertCell();
        totalCell1.textContent = "Total";
        totalCell2.textContent = `${totalTime.toFixed(3)}`;
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });

