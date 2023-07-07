
import { render } from '@testing-library/react';
import TextTrimmingWithEllipsis from './TextTrimming';
import '@testing-library/jest-dom';

describe('TextTrimmingWithEllipsis', () => {
  it('should render the full text if it is shorter than the max length', () => {
    const { getByText } = render(
      <TextTrimmingWithEllipsis text="Hello world" maxLength={20} />
    );
    expect(getByText('Hello world')).toBeInTheDocument();
  });

  it('should trim the text and add an ellipsis if it is longer than the max length', () => {
    const { getByText } = render(
      <TextTrimmingWithEllipsis text="This is a long text that needs to be trimmed" maxLength={20} />
    );
    expect(getByText('This is a long text...')).toBeInTheDocument();
  });

  it('should trim the text at the last space before the max length', () => {
    const { getByText } = render(
      <TextTrimmingWithEllipsis text="This is a long text that needs to be trimmed" maxLength={15} />
    );
    expect(getByText('This is a long...')).toBeInTheDocument();
  });
});