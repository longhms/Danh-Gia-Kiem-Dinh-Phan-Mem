// Import the function you want to test
const { handleSearchIconClick } = require('./homepage');

describe('search icon click event listener', () => {
  let searchIcon;
  let searchInput;

  beforeEach(() => {
    // Mock elements and event listener
    searchIcon = {
      classList: {
        toggle: jest.fn(),
        contains: jest.fn().mockReturnValue(false), // Initially inactive
      },
      addEventListener: jest.fn(),
      contains: jest.fn(),
    };

    searchInput = {
      classList: {
        toggle: jest.fn(),
        contains: jest.fn(),
      },
      focus: jest.fn(),
      value: '',
    };

    // Simulate click on search icon
    handleSearchIconClick(searchIcon, searchInput);
  });

  test('toggles search input visibility when search icon is clicked', () => {
    // Check if search input is activated after click
    expect(searchInput.classList.toggle).toHaveBeenCalledWith('active');
    expect(searchIcon.classList.contains).toHaveBeenCalledWith('active');
    
    // Check if search input is focused when activated
    expect(searchInput.focus).toHaveBeenCalled();

    // Simulate second click on search icon
    handleSearchIconClick(searchIcon, searchInput);

    // Check if search input is deactivated after second click
    expect(searchInput.classList.toggle).toHaveBeenCalledWith('active');
    expect(searchInput.value).toBe(''); // Input value should be cleared
  });

  test('hides search input when clicking outside', () => {
    // Mock event object
    const event = {
      target: {
        contains: jest.fn().mockReturnValue(false), // Simulate clicking outside
      },
    };

    // Simulate click outside
    document.dispatchEvent(new MouseEvent('click', event));

    // Check if search input is deactivated after clicking outside
    expect(searchInput.classList.toggle).toHaveBeenCalledWith('active');
    expect(searchInput.value).toBe(''); // Input value should be cleared
  });
});
