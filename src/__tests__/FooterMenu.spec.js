import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FooterMenu from '../components/FooterMenu.vue'
import { createRouter, createWebHistory } from 'vue-router'

describe('FooterMenu', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/contact', component: {} },
      { path: '/about', component: {} }
    ]
  })

  const mockProps = {
    title: 'Test Footer'
  }

  it('mounts properly', () => {
    const wrapper = mount(FooterMenu, {
      props: mockProps,
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders logo image with correct attributes', () => {
    const wrapper = mount(FooterMenu, {
      props: mockProps,
      global: {
        plugins: [router]
      }
    })
    const logo = wrapper.find('img[alt=""]')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('loading')).toBe('lazy')
    expect(logo.classes()).toContain('object-contain')
    expect(logo.classes()).toContain('shrink-0')
    expect(logo.classes()).toContain('aspect-[1.53]')
  })

  it('renders navigation links correctly', () => {
    const wrapper = mount(FooterMenu, {
      props: mockProps,
      global: {
        plugins: [router]
      }
    })
    const links = wrapper.findAll('a')

    expect(links.length).toBe(4) 
    expect(links[0].text()).toBe('Contáctanos')
    expect(links[0].attributes('href')).toBe('/contact')
    expect(links[1].text()).toBe('Acerca de Nosotros')
    expect(links[1].attributes('href')).toBe('/about')
  })

  it('renders social media links with correct attributes', () => {
    const wrapper = mount(FooterMenu, {
      props: mockProps,
      global: {
        plugins: [router]
      }
    })
    const socialLinks = wrapper.findAll('a[aria-label="Social media link"]')
    const socialImages = wrapper.findAll('img[alt="facebook"], img[alt="instagram"]')

    expect(socialLinks.length).toBe(2)
    expect(socialImages.length).toBe(2)
    
    expect(socialImages[0].attributes('alt')).toBe('facebook')
    
    expect(socialImages[1].attributes('alt')).toBe('instagram')
  })

  it('has correct CSS classes and styles', () => {
    const wrapper = mount(FooterMenu, {
      props: mockProps,
      global: {
        plugins: [router]
      }
    })

    const footer = wrapper.find('footer')
    expect(footer.classes()).toContain('flex')
    expect(footer.classes()).toContain('relative')
    expect(footer.classes()).toContain('gap-10')
    expect(footer.classes()).toContain('items-center')
    expect(footer.classes()).toContain('px-10')
    expect(footer.classes()).toContain('mt-0')
    expect(footer.classes()).toContain('min-h-[193fpx]')

    const nav = wrapper.find('nav')
    expect(nav.classes()).toContain('flex')
    expect(nav.classes()).toContain('z-0')
    expect(nav.classes()).toContain('flex-col')

    const ul = wrapper.find('ul')
    expect(ul.classes()).toContain('flex')
    expect(ul.classes()).toContain('flex-col')
    expect(ul.classes()).toContain('w-full')
    expect(ul.classes()).toContain('text-2xl')
    expect(ul.classes()).toContain('list-none')
    expect(ul.classes()).toContain('p-0')
  })

  it('requires title prop', () => {
    const wrapper = mount(FooterMenu, {
      props: mockProps,
      global: {
        plugins: [router]
      }
    })

    const props = wrapper.vm.$options.props
    expect(props.title.required).toBe(true)
  })
}) 