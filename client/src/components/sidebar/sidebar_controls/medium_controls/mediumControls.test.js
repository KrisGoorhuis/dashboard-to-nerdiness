import React from 'react'
import { MediumControls } from './mediumControls.js'
import { shallow } from 'enzyme'

let propsMock = {
   mediumPublications: [0, 10, 200]
}

describe('mediumControls', () => {
   it ('renders without crashing', () => {
      expect(shallow(<MediumControls />))
   })


   // it ('lets you know if your publication string doesnt exist', () => {
   //    const wrapper = shallow(<MediumControls {...propsMock} />)
   //    const fakeEvent = { preventDefault: () => console.log("")}
   //    wrapper.find('#medium_controls_form').simulate('submit', fakeEvent)
   // })

   // it ('should set testState to "success" on form submit', () => {
   //    const wrapper = shallow(<MediumControls {...propsMock} />)
   //    const fakeEvent = { preventDefault: () => console.log("")}
   //    wrapper.find('#medium_controls_form').simulate('submit', fakeEvent)
   //    expect(wrapper.state().testState).toEqual("success")
   // })

})