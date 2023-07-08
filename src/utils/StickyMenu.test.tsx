
import { render, screen } from '@testing-library/react';
import StickyMenu from './StickyMenu';

describe('StickyMenu', () => {
  it('renders children', () => {
    render(<StickyMenu><div>Test</div></StickyMenu>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('sticks to the bottom of the screen when scrolling up', () => {
    const { container } = render(<StickyMenu><div>Test</div></StickyMenu>);
    const menu = container.firstChild as HTMLElement;
    expect(menu.style.position).toBe('');
    window.scroll(0, 100);
    expect(menu.style.position).toBe('fixed');
  });

  it('does not stick to the bottom of the screen when scrolling down', () => {
    const { container } = render(<StickyMenu><div>Test</div></StickyMenu>);
    const menu = container.firstChild as HTMLElement;
    expect(menu.style.position).toBe('');
    window.scroll(0, 100);
    expect(menu.style.position).toBe('fixed');
    window.scroll(0, 0);
    expect(menu.style.position).toBe('');
  });
});