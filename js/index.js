// Base URL for the API
const baseURL = 'http://localhost:3000/monsters';

// State management
let currentPage = 1;
const limit = 50;

// Function to fetch monsters
async function fetchMonsters(page = 1) {
    try {
        const response = await fetch(`${baseURL}?_limit=${limit}&_page=${page}`);
        const monsters = await response.json();
        return monsters;
    } catch (error) {
        console.error('Error fetching monsters:', error);
    }
}

// Function to display monsters
function displayMonsters(monsters) {
    const container = document.getElementById('monster-container');
    monsters.forEach(monster => {
        const monsterDiv = document.createElement('div');
        monsterDiv.classList.add('monster');
        monsterDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>
        `;
        container.appendChild(monsterDiv);
    });
}

// Function to handle form submission
document.getElementById('monster-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const description = document.getElementById('description').value;

    const newMonster = { name, age: parseFloat(age), description };

    try {
        await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newMonster)
        });
        document.getElementById('monster-form').reset();
        document.getElementById('monster-container').innerHTML = ''; // Clear existing monsters
        currentPage = 1; // Reset page to 1
        loadMonsters(); // Reload monsters
    } catch (error) {
        console.error('Error creating monster:', error);
    }
});

// Function to load monsters and set up event listeners
async function loadMonsters() {
    const monsters = await fetchMonsters(currentPage);
    displayMonsters(monsters);
}

// Event listener for the load more button
document.getElementById('load-more').addEventListener('click', async () => {
    currentPage++;
    await loadMonsters();
});

// Initial load of monsters
loadMonsters();
