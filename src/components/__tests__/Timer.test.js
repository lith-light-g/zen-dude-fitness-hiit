import React from 'react';
import { shallow } from 'enzyme';
import Timer from '../Timer';

describe('Timer component', () => {
  describe('Lifecycle', () => {
    it('should set an interval after mounting', () => {
      const wrapper = shallow(<Timer time={1000} />);
      expect(wrapper.instance().interval).toBeTruthy();
    });
  });
});
