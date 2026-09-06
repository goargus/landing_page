import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Carousel from '../components/Carousel.vue'

describe('Carousel', () => {
  const mockProjects = [
    {
      imagesrc: '/path/to/image1.jpg',
      imageAlt: 'Project 1',
      link: 'https://project1.com'
    },
    {
      imagesrc: '/path/to/image2.jpg',
      imageAlt: 'Project 2',
      link: 'https://project2.com'
    }
  ]

  it('mounts properly', () => {
    const wrapper = mount(Carousel, {
      props: {
        projects: mockProjects
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders all project slides', () => {
    const wrapper = mount(Carousel, {
      props: {
        projects: mockProjects
      }
    })
    const slides = wrapper.findAll('.flex-none')
    expect(slides.length).toBe(mockProjects.length)
  })

  it('renders navigation buttons', () => {
    const wrapper = mount(Carousel, {
      props: {
        projects: mockProjects
      }
    })
    expect(wrapper.find('.arrow-left').exists()).toBe(true)
    expect(wrapper.find('.arrow-right').exists()).toBe(true)
  })

  it('renders project images with correct attributes', () => {
    const wrapper = mount(Carousel, {
      props: {
        projects: mockProjects
      }
    })
    const images = wrapper.findAll('img.image-size')
    
    mockProjects.forEach((project, index) => {
      expect(images[index].attributes('src')).toBe(project.imagesrc)
      expect(images[index].attributes('alt')).toBe(project.imageAlt)
    })
  })

  it('renders project links with correct attributes', () => {
    const wrapper = mount(Carousel, {
      props: {
        projects: mockProjects
      }
    })
    const links = wrapper.findAll('a.button-website')
    
    mockProjects.forEach((project, index) => {
      expect(links[index].attributes('href')).toBe(project.link)
      expect(links[index].attributes('target')).toBe('_blank')
    })
  })

  it('renders project links with rel="noopener noreferrer"', () => {
    const wrapper = mount(Carousel, {
      props: { projects: mockProjects }
    })
    const links = wrapper.findAll('a.button-website')

    links.forEach((link) => {
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    })
  })

  it('is focusable and exposes a carousel role', () => {
    const wrapper = mount(Carousel, {
      props: { projects: mockProjects }
    })
    expect(wrapper.attributes('tabindex')).toBe('0')
    expect(wrapper.attributes('role')).toBe('region')
    expect(wrapper.attributes('aria-roledescription')).toBe('carrusel')
  })

  it('advances to the next slide on ArrowRight', async () => {
    const wrapper = mount(Carousel, {
      props: { projects: mockProjects }
    })
    await wrapper.trigger('keydown', { key: 'ArrowRight' })

    expect(wrapper.find('.dot-active').exists()).toBe(true)
    expect(wrapper.findAll('.dot-indicator')[1].classes()).toContain('dot-active')
  })

  it('returns to the previous slide on ArrowLeft', async () => {
    const wrapper = mount(Carousel, {
      props: { projects: mockProjects }
    })
    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    await wrapper.trigger('keydown', { key: 'ArrowLeft' })

    expect(wrapper.findAll('.dot-indicator')[0].classes()).toContain('dot-active')
  })

  it('wraps around when moving past the last slide', async () => {
    const wrapper = mount(Carousel, {
      props: { projects: mockProjects }
    })
    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    await wrapper.trigger('keydown', { key: 'ArrowRight' })

    expect(wrapper.findAll('.dot-indicator')[0].classes()).toContain('dot-active')
  })

  it('announces the current slide through an aria-live region', async () => {
    const wrapper = mount(Carousel, {
      props: { projects: mockProjects }
    })
    const live = wrapper.find('[aria-live="polite"]')

    expect(live.exists()).toBe(true)
    expect(live.text()).toBe('Diapositiva 1 de 2: Project 1')

    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.find('[aria-live="polite"]').text()).toBe('Diapositiva 2 de 2: Project 2')
  })

  it('hides slides that are not current from assistive technology', async () => {
    const wrapper = mount(Carousel, {
      props: { projects: mockProjects }
    })
    const slides = wrapper.findAll('.flex-none')

    expect(slides[0].attributes('aria-hidden')).toBe('false')
    expect(slides[1].attributes('aria-hidden')).toBe('true')
    expect(slides[1].attributes('inert')).toBeDefined()
  })
})
