import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/test-utils';

import { ScreenHeader } from './ScreenHeader';

describe('ScreenHeader', () => {
  it('hides the back chevron on primary screens', () => {
    renderWithProviders(<ScreenHeader title="Home" />);
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });

  it('shows the back chevron on secondary screens and fires onBack', () => {
    const onBack = jest.fn();
    renderWithProviders(<ScreenHeader title="Accounts" onBack={onBack} />);
    fireEvent.press(screen.getByLabelText('Go back'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
