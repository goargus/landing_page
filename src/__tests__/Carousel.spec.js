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
})