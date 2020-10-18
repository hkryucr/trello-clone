import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Signup from '../../src/views/Signup.vue'
import VueRouter from 'vue-router'
const router = new VueRouter()

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
      localVue,
      router
    })
    wrapper.find('form').trigger('submit')
    expect(actions.signup).toHaveBeenCalled()
  })
})

// test('dispatches fetchListData with $route.params.type', async () => {
//   expect.assertions(1)
//   const store = createStore()
//   store.dispatch = jest.fn(() => Promise.resolve())
//   const type = 'a type'
//   const mocks = {
//     $route: {
//       params: {
//         type
//       }
//     }
//   }
//   createWrapper({
//     store,
//     mocks
//   })
//   await flushPromises()
//   expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {
//   type
//   })

// })
