import Splash from '@/views/Splash.vue'
import { mount } from '@vue/test-utils'

describe('Splash', () => {
  test('if user is not logged in, do not show login button', () => {
    const wrapper = mount(Splash)
    expect(wrapper.find('button').isVisible()).toBe(true)
  })
})
