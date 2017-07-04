import React from 'react';
import { shallow } from 'enzyme';
import MediaItem from './MediaItem';
import { imageBaseUrl } from '../constants';
import { Item, Icon, Rating } from 'semantic-ui-react';
import truncate from 'lodash/truncate';
import { Link } from 'react-router';

const setup = props => {
  const actions = {
    toggleFavorite: jest.fn()
  };

  const component = shallow(<MediaItem {...props} {...actions} />);

  return {
    component: component,
    actions: actions,
    link: component.find(Link),
    image: component.find(Item.Image),
    description: component.find(Item.Description),
    rating: component.find(Rating)
  };
};

describe('MediaItem component', () => {
  const sampleProps = {
    id: 1,
    type: 'flick',
    posterPath: 'poster.jpg',
    title: 'Lorem Ipsum',
    releaseDate: '2013-10-30',
    overview: 'Lorem Ipsum is a dummy text',
    voteAverage: '8',
    favorite: true
  };

  it('should display poster', () => {
    const { image } = setup(sampleProps);
    expect(image.prop('src')).toEqual(imageBaseUrl + sampleProps.posterPath);
  });

  it('should display title', () => {
    const { link } = setup(sampleProps);
    expect(link.prop('children')).toEqual(sampleProps.title);
  });

  it('should display description', () => {
    const { description } = setup(sampleProps);
    const overview = truncate(sampleProps.overview, { length: 250 });
    expect(description.prop('children')).toEqual(overview);
  });

  it('should display link', () => {
    const { link } = setup(sampleProps);
    const newTitle = sampleProps.title.replace(/[\s.<>:;&,]/g, '-');
    const linkAddress = `/${sampleProps.type}/${sampleProps.id}/${newTitle}`;
    expect(link.prop('to')).toEqual(linkAddress);
  });

  it('should display favorite', () => {
    const { rating, actions } = setup(sampleProps);
    expect(rating.prop('rating')).toEqual(1);
  });
});
