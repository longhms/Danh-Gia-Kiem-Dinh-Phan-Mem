document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');

    // Toggle search input visibility when search icon is clicked
    searchIcon.addEventListener('click', function() {
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
        }
    });

    // Hide search input when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchIcon.contains(event.target) && !searchInput.contains(event.target)) {
            searchInput.classList.remove('active');
            searchInput.value = '';
        }
    });
});
