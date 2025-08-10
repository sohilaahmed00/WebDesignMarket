// Currently not used, but here if future interactivity is needed
console.log("Blog card loaded successfully.");

  // Tag removal interaction
  document.querySelectorAll('.tag i').forEach(icon => {
    icon.addEventListener('click', function () {
      this.parentElement.remove();
    });
  });

  // Pagination activation toggle
  document.querySelectorAll('.page-number').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.page-number').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });