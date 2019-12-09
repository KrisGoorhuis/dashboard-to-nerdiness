import React from 'react'
import { shallow } from 'enzyme'
import { RedditControls } from './redditControls.js'
import ReactDOM from 'react-dom'

let propsMock = {
   subreddits: ['totalwar']
}

it('should not add a subreddit if that subreddit is already listed', () => {
   beforeEach(() => {
   })
   let node = document.createElement('div')
   let component = ReactDOM.render(<RedditControls />, node)

   component.find('input[type=text]').simulate('submit', {
      target: {
         value: 'totalwar',
      }
   })
   expect(component.state.subreddits.toBe(['totalwar']))
})