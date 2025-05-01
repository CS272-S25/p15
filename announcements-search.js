// Announcements Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchAnnouncements');
    const searchButton = document.querySelector('.btn-outline-secondary');
    
    if (searchInput) {
        // Function to perform the search
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const announcements = document.querySelectorAll('.announcements-list .card');
            let hasResults = false;

            announcements.forEach(announcement => {
                const title = announcement.querySelector('.card-title')?.textContent.toLowerCase() || '';
                const content = announcement.querySelector('.card-text')?.textContent.toLowerCase() || '';
                const metadata = announcement.querySelector('.metadata')?.textContent.toLowerCase() || '';
                const badges = Array.from(announcement.querySelectorAll('.badge'))
                    .map(badge => badge.textContent.toLowerCase())
                    .join(' ');

                const isVisible = 
                    title.includes(searchTerm) || 
                    content.includes(searchTerm) || 
                    metadata.includes(searchTerm) ||
                    badges.includes(searchTerm);

                announcement.style.display = isVisible ? 'block' : 'none';
                if (isVisible) hasResults = true;
            });

            // Show/hide no results message
            let noResultsMsg = document.getElementById('noResultsMessage');
            if (!hasResults) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.id = 'noResultsMessage';
                    noResultsMsg.className = 'alert alert-info mt-3';
                    noResultsMsg.innerHTML = `
                        <h4>No announcements found</h4>
                        <p>Try different keywords or check your spelling.</p>
                    `;
                    document.querySelector('.announcements-list').appendChild(noResultsMsg);
                }
                noResultsMsg.style.display = 'block';
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        }

        // Search on input change (real-time search)
        searchInput.addEventListener('input', performSearch);

        // Search when clicking the search button
        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }

        // Search when pressing Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Clear search when clicking the X in the search input
        searchInput.addEventListener('search', function() {
            if (this.value === '') {
                performSearch();
            }
        });
    }
}); 