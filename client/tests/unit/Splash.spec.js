import Splash from '@/views/Splash.vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
// import Signup from '../../src/views/Signup.vue'
import VueRouter from 'vue-router'
const router = new VueRouter()

describe('Splash.vue', () => {
  test('renders "Splash"', () => {
    const wrapper = mount(Splash)
    expect(wrapper.vm.$el.textContent).toContain('Trello')
  })
  test('renders a login anchor tag with login.title as text', () => {
    const login = {
      url: '/login',
      title: 'Log In'
    }
    const wrapper = shallowMount(Splash, {
      propsData: { login }
    })
    const loginEl = wrapper.find('[data-testid="login"]')
    expect(loginEl.text()).toBe(login.title)
    expect(loginEl.attributes().href === login.url).toBe(true)
  })
  test('renders a signup anchor tag with signup.title as text', () => {
    const signup = {
      url: '/signup',
      title: 'Sign Up'
    }
    const wrapper = shallowMount(Splash, {
      propsData: { signup }
    })
    const signupEl = wrapper.find('[data-testid="signup"]')
    expect(signupEl.text()).toBe(signup.title)
    expect(signupEl.attributes().href === signup.url).toBe(true)
  })
})

const localVue = createLocalVue()
localVue.use(Vuex)

describe('demo-login', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      login: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  it('calls store action "login" when demo-login button is clicked', () => {
    const wrapper = shallowMount(Splash, {
      store,
      localVue,
      router
    })
    wrapper.find('[data-testid="demo-login"]').trigger('click')
    expect(actions.login).toHaveBeenCalled()
  })
})

describe('quick-signup', () => {
  test('calls handleClick when button is clicked', async () => {
    const handleClick = jest.fn()
    const wrapper = shallowMount(Splash)
    wrapper.setMethods({ handleClick })
    // expect(wrapper.find('[data-testid="quick-signup"')).toBe(true)
    // await wrapper.find('[data-testid="quick-signup-input"]').setValue('hello@gmail.com')
    // debugger
    wrapper.find('[data-testid="quick-signup-form"]').trigger('submit.prevent')
    // wrapper.find('form').trigger('submit.prevent')
    // wrapper.find('[data-testid="quickSignupButton"]').trigger('submit')
    // await wrapper.vm.$nextTick()
    // debugger
    expect(handleClick).toHaveBeenCalled()
  })
})
