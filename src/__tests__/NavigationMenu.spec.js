import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavigationMenu from '../components/NavigationMenu.vue'
import { createRouter, createWebHistory } from 'vue-router'

describe('NavigationMenu', () => {
  const mockNavItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Portfolio', href: '/portfolio' },
    { title: 'Contact', href: '/contact' }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: {} },
      { path: '/about', component: {} },
      { path: '/portfolio', component: {} },
      { path: '/contact', component: {} }
    ]
  })

  it('mounts properly', () => {
    const wrapper = mount(NavigationMenu, {
      props: {
        navItems: mockNavItems
      },
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders all navigation items', () => {
    const wrapper = mount(NavigationMenu, {
      props: {
        navItems: mockNavItems
      },
      global: {
        plugins: [router]
      }
    })
    const links = wrapper.findAll('a')
    expect(links.length).toBe(mockNavItems.length)
  })

  it('renders navigation items with correct titles and links', () => {
    const wrapper = mount(NavigationMenu, {
      props: {
        navItems: mockNavItems
      },
      global: {
        plugins: [router]
      }
    })
    const links = wrapper.findAll('a')

    mockNavItems.forEach((item, index) => {
      expect(links[index].text()).toBe(item.title)
      expect(links[index].attributes('href')).toBe(item.href)
    })
  })

  it('applies correct classes to navigation items', () => {
    const wrapper = mount(NavigationMenu, {
      props: {
        navItems: mockNavItems
      },
      global: {
        plugins: [router]
      }
    })
    const links = wrapper.findAll('a')

    links.forEach(link => {
      expect(link.classes()).toContain('menu-item')
    })

    expect(links[0].classes()).toContain('home-link')
  })

  it('renders with correct container classes', () => {
    const wrapper = mount(NavigationMenu, {
      props: {
        navItems: mockNavItems
      },
      global: {
        plugins: [router]
      }
    })
    const nav = wrapper.find('nav')

    expect(nav.classes()).toContain('nav-container')
    expect(nav.classes()).toContain('nav-font')
    expect(nav.classes()).toContain('nav-shadow')
  })
}) 