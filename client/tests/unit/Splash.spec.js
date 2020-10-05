import Splash from '@/views/Splash.vue'
import { mount } from '@vue/test-utils'

describe('Splash', () => {
  test('if user is not logged in, do not show login button', () => {
    const wrapper = mount(Splash)
    expect(wrapper.find('button').isVisible()).toBe(true)
  })

  test('if user is logged in, show login button', async () => {
    const wrapper = mount(Splash)
    wrapper.setData({
      loggedIn: true
    })
    await wrapper.vm.$nextTick
    expect(wrapper.find('button').isVisible()).toBe(false)
  })
})
