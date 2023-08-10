document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("search");
  const suggestionWrap = document.querySelector(".suggestion-wrap");
  const suggestions = ["New Arrivals", "Ladies", "Mens", "Accessories", "Sale"];

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchQuery = searchInput.value.trim();

    if (searchQuery !== "") {
      const encodedQuery = encodeURIComponent(searchQuery);
      window.location.href = `/search?q=${encodedQuery}`;
    }
  });

  searchInput.addEventListener("input", function () {
    const inputText = searchInput.value.trim().toLowerCase();
    suggestionWrap.innerHTML = "";

    if (inputText.length === 0) {
      return;
    }

    const matchingSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputText)
    );

    matchingSuggestions.forEach((suggestion) => {
      const suggestionLink = document.createElement("a");
      suggestionLink.textContent = suggestion;
      suggestionLink.href = `/search?q=${encodeURIComponent(suggestion)}`;
      suggestionWrap.appendChild(suggestionLink);
    });
  });
});
