import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

//test UI or conditional items
describe('<BurgerBuilder/> Container', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });
  it('should render <BuildControls/> when receiving ingredients', () => {
    wrapper.setProps({ ings: { salad: 0 }, price: 0 });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
