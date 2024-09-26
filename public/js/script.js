(function() {
  'use strict';
  window.addEventListener('load', function() {
    var forms = document.getElementsByClassName('needs-validation');

    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();



const priceToggle = document.getElementById('flexSwitchCheckDefault');

priceToggle.addEventListener("change", () => {
    const gstElements = document.querySelectorAll(".gst");

    gstElements.forEach(gst => {
        if (priceToggle.checked) {
            gst.classList.add("gst-visible");
        } else {
            gst.classList.remove("gst-visible");
        }
    });
});





document.addEventListener("DOMContentLoaded", function() {
  const text = "@QUESTNEST";
  const container = document.querySelector(".typewriter");
  let index = 0;

  // Clear the content before starting the typing effect
  container.textContent = '';

  function typeEffect() {
      if (index < text.length) {
          container.textContent += text.charAt(index);
          index++;
          setTimeout(typeEffect, 100); // Delay between each letter
      } else {
          setTimeout(() => {
              container.textContent = ''; // Reset text after it's fully displayed
              index = 0;
              typeEffect();
          }, 2500); // Delay before repeating
      }
  }

  typeEffect(); // Start the typing effect
});