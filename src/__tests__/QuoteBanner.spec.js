import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuoteBanner from '../components/QuoteBanner.vue'

describe('QuoteBanner', () => {
  it('mounts properly', () => {
    const wrapper = mount(QuoteBanner)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the main heading correctly', () => {
    const wrapper = mount(QuoteBanner)
    const heading = wrapper.find('h1')
    expect(heading.exists()).toBe(true)
    expect(heading.text()).toBe('Y TÚ, ¿YA TIENES WEBSITE?')
    expect(heading.classes()).toContain('text-lightGreen')
  })

  it('renders the website preview image', () => {
    const wrapper = mount(QuoteBanner)
    const image = wrapper.find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('alt')).toBe('Website Preview')
    expect(image.classes()).toContain('max-w-full')
    expect(image.classes()).toContain('h-auto')
    expect(image.classes()).toContain('relative')
  })

  it('renders the call to action heading', () => {
    const wrapper = mount(QuoteBanner)
    const ctaHeading = wrapper.find('h3')
    expect(ctaHeading.exists()).toBe(true)
    expect(ctaHeading.text()).toBe('¡Quiero Mi Website!')
    expect(ctaHeading.classes()).toContain('text-3xl')
    expect(ctaHeading.classes()).toContain('font-bold')
    expect(ctaHeading.classes()).toContain('text-txtcolor')
  })

  it('renders the quote button with correct attributes', () => {
    const wrapper = mount(QuoteBanner)
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Cotizar')
    expect(button.classes()).toContain('px-20')
    expect(button.classes()).toContain('py-2')
    expect(button.classes()).toContain('bg-lightGreen')
    expect(button.classes()).toContain('text-white')
    expect(button.classes()).toContain('border-2')
    expect(button.classes()).toContain('rounded-full')
    expect(button.classes()).toContain('shadow-3xl')
    expect(button.classes()).toContain('hover:bg-lightGreen')
    expect(button.classes()).toContain('transition')
    expect(button.classes()).toContain('text-xl')
  })

  it('has correct section layout and classes', () => {
    const wrapper = mount(QuoteBanner)
    const section = wrapper.find('section')

    expect(section.classes()).toContain('relative')
    expect(section.classes()).toContain('flex')
    expect(section.classes()).toContain('flex-col')
    expect(section.classes()).toContain('md:flex-row')
    expect(section.classes()).toContain('items-center')
    expect(section.classes()).toContain('justify-center')
    expect(section.classes()).toContain('w-auto')
    expect(section.classes()).toContain('max-h-[225px]')
    expect(section.classes()).toContain('text-center')
    expect(section.classes()).toContain('py-1')
    expect(section.classes()).toContain('bg-white')

    const divs = wrapper.findAll('div')
    expect(divs.length).toBe(3)

    expect(divs[0].classes()).toContain('w-1/3')
    expect(divs[0].classes()).toContain('font-inter')
    expect(divs[0].classes()).toContain('max-w-[300px]')
    expect(divs[0].classes()).toContain('text-3xl')
    expect(divs[0].classes()).toContain('uppercase')

    expect(divs[1].classes()).toContain('relative')
    expect(divs[1].classes()).toContain('flex')
    expect(divs[1].classes()).toContain('flex-col')
    expect(divs[1].classes()).toContain('items-center')
    expect(divs[1].classes()).toContain('justify-center')
    expect(divs[1].classes()).toContain('w-2/3')

    expect(divs[2].classes()).toContain('w-3/3')
    expect(divs[2].classes()).toContain('flex')
    expect(divs[2].classes()).toContain('flex-col')
    expect(divs[2].classes()).toContain('items-center')
    expect(divs[2].classes()).toContain('mt-4')
    expect(divs[2].classes()).toContain('md:mt-0')
  })
}) 