function showLoading(event) {
  const loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.classList.add('active');
  
  setTimeout(() => {
    window.location.href = event.target.closest('a').href;
  }, 500);
  
  event.preventDefault();
}

function updateClock() {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      document.getElementById('clock').textContent = formattedTime;
  }

  updateClock();

  setInterval(updateClock, 1000);

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  
  fetch("facts.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(facts => {
      const container = document.getElementById("facts");
      if (container && Array.isArray(facts)) {
        container.innerHTML = facts.map((fact, index) => `
          <div class="fact-card">
            <h3>Fact ${index + 1}</h3>
            <p>${fact}</p>
          </div>
        `).join('');
      } else {
        throw new Error('Facts data is not in expected format');
      }
      if (loadingScreen) loadingScreen.style.display = 'none';
    })
    .catch(error => {
      console.error('Error loading facts:', error);
      const container = document.getElementById("facts");
      if (container) {
        container.innerHTML = '<p>Error loading facts: ' + error.message + '</p>';
      }
      if (loadingScreen) loadingScreen.style.display = 'none';
    });
});
