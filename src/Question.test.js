import React from 'react';
import { render } from '@testing-library/react';
import Question from './Question';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';


it('matches the snapshot', () => {
  const tree = renderer.create(<Question />).toJSON();
  expect(tree).toMatchSnapshot();
});