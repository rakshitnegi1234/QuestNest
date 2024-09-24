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


