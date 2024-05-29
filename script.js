 // Function to create a promise that resolves after a random time between 1 and 3 seconds
        function createPromise(promiseNumber) {
            return new Promise((resolve) => {
                const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
                setTimeout(() => {
                    resolve({ promiseNumber, time });
                }, time * 1000);
            });
        }

        // Create three promises
        const promises = [createPromise(1), createPromise(2), createPromise(3)];

        const startTime = performance.now();

        // Use Promise.all to wait for all promises to resolve
        Promise.all(promises).then((results) => {
            const endTime = performance.now();
            const totalTime = (endTime - startTime) / 1000;

            // Remove the loading row
            const loadingRow = document.getElementById('loadingRow');
            loadingRow.parentNode.removeChild(loadingRow);

            // Get the table element
            const table = document.getElementById('promiseTable');

            // Populate the table with the results
            results.forEach((result) => {
                const row = document.createElement('tr');
                const cell1 = document.createElement('td');
                const cell2 = document.createElement('td');
                cell1.textContent = `Promise ${result.promiseNumber}`;
                cell2.textContent = result.time.toFixed(3);
                row.appendChild(cell1);
                row.appendChild(cell2);
                table.appendChild(row);
            });

            // Add the total time row
            const totalRow = document.createElement('tr');
            const totalCell1 = document.createElement('td');
            const totalCell2 = document.createElement('td');
            totalCell1.textContent = 'Total';
            totalCell2.textContent = totalTime.toFixed(3);
            totalRow.appendChild(totalCell1);
            totalRow.appendChild(totalCell2);
            table.appendChild(totalRow);
        });