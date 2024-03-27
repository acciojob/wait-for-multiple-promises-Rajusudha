// Function to generate a random time between 1 and 3 seconds
function randomTime() {
  return Math.floor(Math.random() * 3) + 1;
}

// Function to create a promise that resolves after a random time
function createPromise(id) {
  const time = randomTime();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Promise ${id} resolved after ${time} seconds.`);
      resolve(time);
    }, time * 1000);
  });
}

// Create an array to store promises
const promises = [];

// Create three promises
for (let i = 1; i <= 3; i++) {
  promises.push(createPromise(i));
}

// Add a row to the table with the text Loading...
const loadingRow = document.createElement('tr');
const loadingCell = document.createElement('td');
loadingCell.setAttribute('colspan', '2');
loadingCell.textContent = 'Loading...';
loadingRow.appendChild(loadingCell);
document.getElementById('output').appendChild(loadingRow);

// Wait for all promises to resolve
Promise.all(promises)
  .then((results) => {
    // Remove the loading text from the table
    loadingRow.remove();
    
    // Populate the table with the results
    results.forEach((time, index) => {
      const row = document.createElement('tr');
      const col1 = document.createElement('td');
      const col2 = document.createElement('td');
      col1.textContent = `Promise ${index + 1}`;
      col2.textContent = `${time} seconds`;
      row.appendChild(col1);
      row.appendChild(col2);
      document.getElementById('output').appendChild(row);
    });
    
    // Calculate the total time taken to resolve all promises
    const totalTime = results.reduce((total, time) => total + time, 0);
    const totalRow = document.createElement('tr');
    const totalCol1 = document.createElement('td');
    const totalCol2 = document.createElement('td');
    totalCol1.textContent = 'Total';
    totalCol2.textContent = `${totalTime.toFixed(3)} seconds`;
    totalRow.appendChild(totalCol1);
    totalRow.appendChild(totalCol2);
    document.getElementById('output').appendChild(totalRow);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
