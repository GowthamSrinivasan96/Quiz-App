import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

test('renders Trivia-app', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Trivia-App/i);
  expect(linkElement).toBeInTheDocument();
});

it('matches the snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('App component', () => {
  it('Btn defined or not', () => {
    const wrapper  = shallow(<App />);
    expect(wrapper.find('input[data-cy="autoLogoutTime"]')).toBeDefined();
  });
});
