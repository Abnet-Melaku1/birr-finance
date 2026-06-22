// Render vector icons as a simple host component in tests — avoids the async
// font-loading setState that triggers act() warnings.
jest.mock('@expo/vector-icons/Feather', () => 'Feather');
