import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Signup from '../../src/views/Signup.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Signup', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      signup: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  it('calls store action "signup" when button is clicked', () => {
    const wrapper = shallowMount(Signup, {
      store,
      localVue
    })
    wrapper.find('form').trigger('submit')
    // expect(actions.signup.mock.calls).toHaveLength(1)
    expect(actions.signup).toHaveBeenCalled()
  })
})
