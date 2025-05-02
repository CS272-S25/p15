// Function to fetch and display random jokes
async function rotateFact() {
    const factBox = document.getElementById("fun-fact");
    if (!factBox) return;
    
    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const joke = await response.json();
        factBox.innerHTML = `💡 ${joke.setup}<br>${joke.punchline}`;
    } catch (error) {
        factBox.innerHTML = "💡 Error loading joke. Please try again later.";
        console.error('Error fetching joke:', error);
    }
}

// Ensure DOM is loaded before running
window.addEventListener('DOMContentLoaded', rotateFact);
  