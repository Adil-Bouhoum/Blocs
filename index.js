// Mock database of registered users
const registeredUsers = [
    { username: "user1", email: "user1@example.com", password: "password1" },
    { username: "user2", email: "user2@example.com", password: "password2" },
    // Add more users as needed
];

// Function to handle login
function handleLogin(event) {
    event.preventDefault(); // Prevent form submission
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Check if user exists in registered users array
    const user = registeredUsers.find(user => user.email === email && user.password === password);

    if (user) {
        // Successful login
        alert("Login successful!");
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store logged-in user in localStorage
        updateNavBar(); // Update the navigation bar
        window.location.href = 'index.html'; // Redirect to index.html
    } else {
        // Invalid credentials
        alert("Invalid email or password!");
    }
}

// Function to handle signup
function handleSignup(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirmpass').value;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return; // Stop the signup process
    }

    // Check if email is already registered
    const userExists = registeredUsers.some(user => user.email === email);

    if (userExists) {
        alert("Email is already registered!");
    } else {
        // Add new user to the registered users array
        registeredUsers.push({ username, email, password });
        alert("Signup successful! You can now log in.");
        
        // Switch to login form
        const loginSec = document.querySelector('.login-section');
        loginSec.classList.remove('active');
    }
}

// Function to handle logout
function handleLogout() {
    localStorage.removeItem('loggedInUser'); // Remove logged-in user from localStorage
    updateNavBar(); // Update the navigation bar
    alert("Logged out successfully!");
    window.location.href = 'Login.html'; // Redirect to index.html
}


//Show password Code

// Function to update the navigation bar based on login status
function updateNavBar() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navMenu = document.querySelector('.nav_menu ul');
    if (navMenu) {
        if (loggedInUser) {
            // User is logged in
            navMenu.innerHTML = `
            
            <li><a href="Login.html">Logout</a></li>
            <li>
                <div class="dropdown_menu">
                    <button class="dropbtn">Language</button>
                    <div class="dropdown_content">
                        <a>English</a>
                        <a>Francais</a>
                        <a>Arabic</a>
                    </div>
                </div>
            </li>
            <li><button id="modeToggle" type="button">Dark/Light</button></li>
            `;
        } else {
            // User is not logged in
            navMenu.innerHTML = `
       
            <li><a href="Login.html">Log in</a></li>
            <li><a href="Register.html">Register</a></li>
            <li>
                <div class="dropdown_menu">
                    <button class="dropbtn">Language</button>
                    <div class="dropdown_content">
                        <a>English</a>
                        <a>Francais</a>
                        <a>Arabic</a>
                    </div>
                </div>
            </li>
            <li><button id="modeToggle" type="button">Dark/Light</button></li>
            `;
        }
    }
}

// Event listener for DOMContentLoaded to ensure the nav bar is updated when the page loads
document.addEventListener('DOMContentLoaded', updateNavBar);

// Toggle between login and register forms
document.addEventListener('DOMContentLoaded', () => {
    const loginSec = document.querySelector('.login-section');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');

    if (registerLink) {
        registerLink.addEventListener('click', (event) => {
            event.preventDefault();
            loginSec.classList.add('active');
        });
    }

    if (loginLink) {
        loginLink.addEventListener('click', (event) => {
            event.preventDefault();
            loginSec.classList.remove('active');
        });
    }

    // Event listener for login form submission
    const loginForm = document.querySelector('.login form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Event listener for signup form submission
    const signupForm = document.querySelector('.register form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});


const games = [
    { name: 'Halo Infinite', url: 'Games-xbox.html' },
    { name: 'Cyberpunk 2077', url: 'Games-pc.html' },
    { name: 'Dark souls 3', url: 'Games-ps.html' },
    { name: 'Animal Crossing', url: 'Games-nintendo.html' },
    { name: 'The Witcher 3', url: 'Games-solo.html' },
    { name: 'Final fantasy 16', url: 'Games-multi.html' },
    { name: 'League of legends', url: 'Games-action.html' },
    { name: 'Darkest Dungeons', url: 'Games-MMORPG.html' },
    // Add more games as needed
];

const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('searchResults');

searchBar.addEventListener('input', function() {
    const query = searchBar.value.toLowerCase();
    searchResults.innerHTML = '';
    
    if (query) {
        const filteredGames = games.filter(game => game.name.toLowerCase().includes(query));
        filteredGames.forEach(game => {
            const resultItem = document.createElement('a');
            resultItem.href = game.url;
            resultItem.textContent = game.name;
            searchResults.appendChild(resultItem);
        }); 
        searchResults.style.display = 'block';
    } else {
        searchResults.style.display = 'none';
    }
});

document.addEventListener('click', function(event) {
    if (!searchResults.contains(event.target) && event.target !== searchBar) {
        searchResults.style.display = 'none';
    }
});


/*Dark/Light Mode */

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('modeToggle');
    const currentMode = localStorage.getItem('theme') || 'dark-mode';
    document.documentElement.className = currentMode;

    toggleButton.addEventListener('click', () => {
        let newMode = 'dark-mode';
        if (document.documentElement.classList.contains('dark-mode')) {
            newMode = 'light-mode';
        }
        document.documentElement.className = newMode;
        localStorage.setItem('theme', newMode);
    });
});