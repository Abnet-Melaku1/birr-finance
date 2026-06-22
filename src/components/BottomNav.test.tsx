import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/test-utils';

import { BottomNav } from './BottomNav';

describe('BottomNav', () => {
  it('renders the four tabs and the add action', () => {
    renderWithProviders(<BottomNav active="home" onSelect={jest.fn()} onAdd={jest.fn()} />);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Activity')).toBeTruthy();
    expect(screen.getByText('Planner')).toBeTruthy();
    expect(screen.getByText('Insights')).toBeTruthy();
    expect(screen.getByLabelText('Add transaction')).toBeTruthy();
  });

  it('selects a tab by its key', () => {
    const onSelect = jest.fn();
    renderWithProviders(<BottomNav active="home" onSelect={onSelect} onAdd={jest.fn()} />);
    fireEvent.press(screen.getByText('Planner'));
    expect(onSelect).toHaveBeenCalledWith('planner');
  });

  it('fires the add action from the FAB (not a tab)', () => {
    const onAdd = jest.fn();
    const onSelect = jest.fn();
    renderWithProviders(<BottomNav active="home" onSelect={onSelect} onAdd={onAdd} />);
    fireEvent.press(screen.getByLabelText('Add transaction'));
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
