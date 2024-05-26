const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

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
};
