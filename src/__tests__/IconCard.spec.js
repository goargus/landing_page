import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconCard from '../components/IconCard.vue'

describe('IconCard', () => {
  const mockProps = {
    imageSrc: '/path/to/icon.svg',
    imageAlt: 'Test Icon',
    title: 'Test Title',
    description: 'Test Description'
  }

  it('mounts properly', () => {
    const wrapper = mount(IconCard, {
      props: mockProps
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders with correct props', () => {
    const wrapper = mount(IconCard, {
      props: mockProps
    })

    expect(wrapper.find('h3').text()).toBe(mockProps.title)

    expect(wrapper.find('p').text()).toBe(mockProps.description)

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(mockProps.imageSrc)
    expect(img.attributes('alt')).toBe(mockProps.imageAlt)
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(IconCard, {
      props: mockProps
    })

    const container = wrapper.find('div.flex')
    expect(container.classes()).toContain('flex-col')
    expect(container.classes()).toContain('items-center')
    expect(container.classes()).toContain('text-center')
    expect(container.classes()).toContain('bg-gray-100')
    expect(container.classes()).toContain('rounded-lg')
    expect(container.classes()).toContain('p-16')
    expect(container.classes()).toContain('w-[500px]')

    const iconContainer = wrapper.find('div.flex.justify-center')
    expect(iconContainer.classes()).toContain('rounded-full')
    expect(iconContainer.classes()).toContain('p-8')
    expect(iconContainer.classes()).toContain('shadow-3xl')
    expect(iconContainer.classes()).toContain('border-white')
    expect(iconContainer.classes()).toContain('border-2')

    const img = wrapper.find('img')
    expect(img.classes()).toContain('h-50')
    expect(img.classes()).toContain('w-50')

    const title = wrapper.find('h3')
    expect(title.classes()).toContain('mt-12')
    expect(title.classes()).toContain('text-2xl')
    expect(title.classes()).toContain('font-bold')
    expect(title.classes()).toContain('text-gray-800')

    const description = wrapper.find('p')
    expect(description.classes()).toContain('mt-6')
    expect(description.classes()).toContain('text-gray-600')
    expect(description.classes()).toContain('text-lg')
  })

  it('requires all props', () => {
    const wrapper = mount(IconCard, {
      props: mockProps
    })

    const props = wrapper.vm.$options.props
    expect(props.imageSrc.required).toBe(true)
    expect(props.imageAlt.required).toBe(true)
    expect(props.title.required).toBe(true)
    expect(props.description.required).toBe(true)
  })
}) 