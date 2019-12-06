import React from 'react'
import { shallow } from 'enzyme'
import { Sidebar } from './sidebar.js'

let propsMock = {
   subreddits: [0, 1, 2],
   mediumPublications: [0, 1, 2]
}
describe('sidebar', () => {
   it('renders without crashing', () => {
      expect(shallow(<Sidebar {...propsMock} />)).toHaveLength(1)
   })
})
