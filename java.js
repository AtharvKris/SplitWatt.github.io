
        // Initialize the page when loaded
        window.onload = function() {
            generateRoommateInputs();
        };
        
        // Generate input fields for each roommate
        function generateRoommateInputs() {
            const numRoommates = parseInt(document.getElementById('numRoommates').value);
            const container = document.getElementById('roommateInputs');
            container.innerHTML = ''; // Clear existing inputs
            
            for (let i = 1; i <= numRoommates; i++) {
                const roommateCard = document.createElement('div');
                roommateCard.className = 'roommate-card';
                
                roommateCard.innerHTML = `
                    <div class="form-group">
                        <label for="name${i}">Roommate ${i} Name:</label>
                        <input type="text" id="name${i}" placeholder="Enter name">
                    </div>
                    <div class="form-group">
                        <label for="baths${i}">Number of Baths:</label>
                        <input type="number" id="baths${i}" placeholder="0" min="0">
                    </div>
                    <div class="form-group">
                        <label for="heater${i}">Heater Uses:</label>
                        <input type="number" id="heater${i}" placeholder="0" min="0">
                    </div>
                `;
                
                container.appendChild(roommateCard);
            }
        }
        
        // Calculate the bill split
        function calculateBill() {
            const totalBill = parseFloat(document.getElementById('totalBill').value);
            const numRoommates = parseInt(document.getElementById('numRoommates').value);
            
            // Validate total bill
            if (isNaN(totalBill) || totalBill <= 0) {
                alert('Please enter a valid total bill amount');
                return;
            }
            
            const roommates = [];
            let totalBathCost = 0;
            let totalHeaterCost = 0;
            
            // Collect data for each roommate
            for (let i = 1; i <= numRoommates; i++) {
                const name = document.getElementById(`name${i}`).value || `Roommate ${i}`;
                const baths = parseInt(document.getElementById(`baths${i}`).value) || 0;
                const heater = parseInt(document.getElementById(`heater${i}`).value) || 0;
                
                const bathCost = baths * 1.50;
                const heaterCost = heater * 1.25;
                
                totalBathCost += bathCost;
                totalHeaterCost += heaterCost;
                
                roommates.push({
                    name,
                    baths,
                    bathCost,
                    heater,
                    heaterCost
                });
            }
            
            // Calculate shared cost
            const totalIndividualCosts = totalBathCost + totalHeaterCost;
            const sharedCost = totalBill - totalIndividualCosts;
            const sharedCostPerPerson = sharedCost / numRoommates;
            
            // Display results
            displayResults(roommates, totalBill, totalBathCost, totalHeaterCost, sharedCost, sharedCostPerPerson);
        }
        
        // Display the calculation results
        function displayResults(roommates, totalBill, totalBathCost, totalHeaterCost, sharedCost, sharedCostPerPerson) {
            const resultsDiv = document.getElementById('results');
            const costsSummary = document.getElementById('costsSummary');
            const individualResults = document.getElementById('individualResults');
            
            // Show results section
            resultsDiv.style.display = 'block';
            
            // Format summary
            costsSummary.innerHTML = `
                <h3>Bill Summary</h3>
                <div class="breakdown">
                    <div><span>Total Electricity Bill:</span> <span>€${totalBill.toFixed(2)}</span></div>
                    <div><span>Total Bath Cost:</span> <span>€${totalBathCost.toFixed(2)}</span></div>
                    <div><span>Total Heater Cost:</span> <span>€${totalHeaterCost.toFixed(2)}</span></div>
                    <div><span>Shared Cost (cooking, plugs, etc.):</span> <span>€${sharedCost.toFixed(2)}</span></div>
                    <div><span>Shared Cost per Person:</span> <span>€${sharedCostPerPerson.toFixed(2)}</span></div>
                </div>
            `;
            
            // Clear previous individual results
            individualResults.innerHTML = '';
            
            // Display individual breakdown for each roommate
            roommates.forEach(roommate => {
                const totalCost = roommate.bathCost + roommate.heaterCost + sharedCostPerPerson;
                
                const resultCard = document.createElement('div');
                resultCard.className = 'results-card';
                
                resultCard.innerHTML = `
                    <h3>${roommate.name}'s Share</h3>
                    <div class="breakdown">
                        <div><span>Bath Usage (${roommate.baths} baths × €1.50):</span> <span>€${roommate.bathCost.toFixed(2)}</span></div>
                        <div><span>Heater Usage (${roommate.heater} uses × €1.25):</span> <span>€${roommate.heaterCost.toFixed(2)}</span></div>
                        <div><span>Shared Costs:</span> <span>€${sharedCostPerPerson.toFixed(2)}</span></div>
                        <div class="total-row"><span>Total Share:</span> <span>€${totalCost.toFixed(2)}</span></div>
                    </div>
                `;
                
                individualResults.appendChild(resultCard);
            });
        }
    
