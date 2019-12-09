import React from 'react'
import { RedditListing } from './redditListing.js'
import { shallow } from 'enzyme'

describe('redditListing', () => {
   it('shows confirmation/cancel on clicking remove', () => {
      let wrapper = shallow(<RedditListing />)
      wrapper.find('div.remove_listing').simulate('click')
      expect(wrapper.find('.confirmation_box').exists()).to.equal(true)
   })
})