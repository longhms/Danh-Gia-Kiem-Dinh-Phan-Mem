const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const registerForm = document.getElementById('registerForm');
const usernameInput = document.getElementById('username');
const realNameInput = document.getElementById('realName');
const btnSignUp = document.getElementById('btnSignUp');

document.addEventListener('DOMContentLoaded', () => {


    if (signUpButton && signInButton && container) {
        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });
    } else {
        console.error('One or more elements were not found:', {
            signUpButton,
            signInButton,
            container
        });
    }
});

btnSignUp.addEventListener('submit', (e) => {
    const username = usernameInput.value;
    const realName = realNameInput.value;

    const usernameValid = /^[a-zA-Z0-9]+$/.test(username);
    const realNameValid = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/.test(realName);

    if (!usernameValid) {
        e.preventDefault();
        alert('Tên đăng nhập không được chứa dấu cách hoặc các ký tự đặc biệt.');
        return;
    }

    if (!realNameValid) {
        e.preventDefault();
        alert('Tên thật không được có các dấu cách liên tiếp hoặc các ký tự đặc biệt.');
        return;
    }
});

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
        document.getElementById('errorSI').style.display = 'block';
    }
    if (urlParams.has('errorSU')) {
        
        document.getElementById('errorSU').style.display = 'block';
    }
    if (urlParams.has('compSU')) {
        
        document.getElementById('compSU').style.display = 'block';
    }
    if (urlParams.has('errorSU1')) {
        
        document.getElementById('errorSU1').style.display = 'block';
    }
    if (urlParams.has('errorSU2')) {
        
        document.getElementById('errorSU2').style.display = 'block';
    }
    if (urlParams.has('errorSU3')) {
        
        document.getElementById('errorSU3').style.display = 'block';
    }
};
