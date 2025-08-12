//  الأزرار والفورمات
const registerBtn = document.getElementById('registerBtn');
const guestBtn = document.getElementById('guestBtn');
const registerForm = document.getElementById('registerForm');
const guestForm = document.getElementById('guestForm');

let accountType = '';

// اظهار الفورم المناسب عند الضغط على زر التسجيل
registerBtn.onclick = () => {
  accountType = 'register';
  registerForm.style.display = 'block';
  guestForm.style.display = 'none';
};

guestBtn.onclick = () => {
  accountType = 'guest';
  guestForm.style.display = 'block';
  registerForm.style.display = 'none';
};

// التحقق  الايميل
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// د التحقق من بيانات التسجيل
function submitRegister() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  if (name === '') {
    alert('Please enter your name');
    return false;
  }
  if (!validateEmail(email)) {
    alert('Invalid email format');
    return false;
  }
  if (password.length < 6) {
    alert('Password must be at least 6 characters');
    return false;
  }
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return false;
  }

  alert('Registration successful!');
  return true;
}

// دالة التحقق من بيانات الضيف
function submitGuest() {
  const email = document.getElementById('guestEmail').value.trim();
  const password = document.getElementById('guestPassword').value.trim();

  if (!validateEmail(email)) {
    alert('Invalid email format');
    return false;
  }
  if (password.length < 6) {
    alert('Password must be at least 6 characters');
    return false;
  }

  alert('Guest login successful!');
  return true;
}

document.getElementById('accountForm').addEventListener('submit', function(e) {
  e.preventDefault();
  if (accountType === 'register') {
    if (submitRegister()) {
      console.log('Registered successfully');
    }
  } else if (accountType === 'guest') {
    if (submitGuest()) {
      console.log('Guest logged in successfully');
    }
  } else {
    alert('Please select account type');
  }
  document.getElementById('continueBtn').addEventListener('click', () => {
  const selectedType = document.querySelector('input[name="accountType"]:checked').value;
  showForm(selectedType);  
});

});
