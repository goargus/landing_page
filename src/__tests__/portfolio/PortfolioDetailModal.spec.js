import { describe, it, expect, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import PortfolioDetailModal from '../../components/portfolio/PortfolioDetailModal.vue'

const mockProject = {
  id: '1',
  slug: 'test-project',
  title: 'Test Project',
  shortDescription: 'A test project description',
  category: 'landing-page',
  size: 'major',
  featured: true,
  thumbnail: { src: '/test-image.jpg', alt: 'Test image' },
  heroImage: { src: '/test-hero.jpg', alt: 'Test hero' },
  technologies: ['Vue', 'Tailwind'],
  liveUrl: 'https://example.com',
  completedDate: '2025-01-01',
  order: 1
}

let wrapper = null

const mountModal = () => {
  wrapper = mount(PortfolioDetailModal, {
    props: { project: null },
    attachTo: document.body,
    global: {
      stubs: {
        'router-link': { template: '<a href="#"><slot /></a>' }
      }
    }
  })
  return wrapper
}

const open = async () => {
  await wrapper.setProps({ project: mockProject })
  await flushPromises()
}

const close = async () => {
  await wrapper.setProps({ project: null })
  await flushPromises()
}

const focusableInModal = () => {
  const container = document.querySelector('.modal-container')
  return Array.from(container.querySelectorAll('a[href], button:not([disabled])'))
}

const pressKey = (key, shiftKey = false) => {
  const event = new KeyboardEvent('keydown', { key, shiftKey, bubbles: true, cancelable: true })
  document.dispatchEvent(event)
  return event
}

afterEach(() => {
  if (wrapper) {
    wrapper.unmount()
    wrapper = null
  }
  document.body.innerHTML = ''
  document.body.style.overflow = ''
})

describe('PortfolioDetailModal focus management', () => {
  it('moves focus into the dialog when it opens', async () => {
    mountModal()
    await open()

    const container = document.querySelector('.modal-container')
    expect(container).not.toBeNull()
    expect(container.contains(document.activeElement)).toBe(true)
    expect(document.activeElement).toBe(document.querySelector('.modal-close'))
  })

  it('returns focus to the element that opened it', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()
    expect(document.activeElement).toBe(trigger)

    mountModal()
    await open()
    expect(document.activeElement).not.toBe(trigger)

    await close()
    expect(document.activeElement).toBe(trigger)
  })

  it('cycles Tab from the last focusable element back to the first', async () => {
    mountModal()
    await open()

    const focusable = focusableInModal()
    expect(focusable.length).toBeGreaterThan(1)

    const last = focusable[focusable.length - 1]
    last.focus()
    expect(document.activeElement).toBe(last)

    pressKey('Tab')
    expect(document.activeElement).toBe(focusable[0])
  })

  it('cycles Shift+Tab from the first focusable element back to the last', async () => {
    mountModal()
    await open()

    const focusable = focusableInModal()
    const first = focusable[0]
    first.focus()
    expect(document.activeElement).toBe(first)

    pressKey('Tab', true)
    expect(document.activeElement).toBe(focusable[focusable.length - 1])
  })

  it('pulls focus back inside when it escapes the dialog', async () => {
    const outside = document.createElement('button')
    document.body.appendChild(outside)

    mountModal()
    await open()

    outside.focus()
    expect(document.activeElement).toBe(outside)

    pressKey('Tab')
    expect(document.activeElement).toBe(focusableInModal()[0])
  })

  it('prevents the default Tab behaviour while trapping focus', async () => {
    mountModal()
    await open()

    const focusable = focusableInModal()
    focusable[focusable.length - 1].focus()

    const event = pressKey('Tab')
    expect(event.defaultPrevented).toBe(true)
  })

  it('emits close on Escape', async () => {
    mountModal()
    await open()

    pressKey('Escape')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('does nothing on Escape when no project is set', () => {
    mountModal()

    pressKey('Escape')
    expect(wrapper.emitted('close')).toBeFalsy()
  })
})
