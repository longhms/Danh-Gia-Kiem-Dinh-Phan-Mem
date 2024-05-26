const { init } = require('./loginn');

describe('DOMContentLoaded event listener', () => {
    let signUpButton;
    let signInButton;
    let container;

    beforeEach(() => {
        // Mock DOM elements
        signUpButton = document.createElement('button');
        signUpButton.id = 'signUp';
        document.body.appendChild(signUpButton);

        signInButton = document.createElement('button');
        signInButton.id = 'signIn';
        document.body.appendChild(signInButton);

        container = document.createElement('div');
        container.id = 'container';
        document.body.appendChild(container);
    });

    afterEach(() => {
        // Clean up DOM
        document.body.removeChild(signUpButton);
        document.body.removeChild(signInButton);
        document.body.removeChild(container);
    });

    test('adds right-panel-active class when signUpButton is clicked', () => {
        // Initialize the script
        init();

        // Simulate click on sign up button
        signUpButton.dispatchEvent(new Event('click'));

        // Check if the container has the class
        expect(container.classList.contains('right-panel-active')).toBe(true);
    });

    test('removes right-panel-active class when signInButton is clicked', () => {
        // Initialize the script
        init();

        // Simulate adding the class first
        container.classList.add('right-panel-active');

        // Simulate click on sign in button
        signInButton.dispatchEvent(new Event('click'));

        // Check if the container does not have the class
        expect(container.classList.contains('right-panel-active')).toBe(false);
    });

    test('logs error if elements are not found', () => {
        // Remove elements to trigger the error
        document.body.removeChild(signUpButton);
        document.body.removeChild(signInButton);
        document.body.removeChild(container);

        console.error = jest.fn();

        // Initialize the script
        init();

        // Check if the error was logged
        expect(console.error).toHaveBeenCalledWith('One or more elements were not found:', {
            signUpButton: null,
            signInButton: null,
            container: null
        });
    });
});
