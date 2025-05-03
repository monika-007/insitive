document.addEventListener("DOMContentLoaded", function () {
    const lightModeToggle = document.getElementById("light-mode-toggle");

    function updateToggleButtons() {
        if (lightModeToggle && lightModeToggle.checked) {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        }
    }

    if (lightModeToggle) {
        lightModeToggle.addEventListener("change", updateToggleButtons);
        updateToggleButtons(); // initialize theme on load
    } else {
        console.warn("Element #light-mode-toggle not found.");
    }
});