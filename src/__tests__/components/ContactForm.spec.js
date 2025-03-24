import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactForm from '../../components/ContactForm.vue'

describe('ContactForm', () => {
  it('mounts properly', () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.exists()).toBe(true)
  })

  it('has required form fields', () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.findAll('input').length).toBe(4)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('renders all input fields with correct attributes', () => {
    const wrapper = mount(ContactForm)
    const inputs = wrapper.findAll('input')

    const expectedFields = [
      { type: 'text', placeholder: 'Nombre' },
      { type: 'text', placeholder: 'Apellido' },
      { type: 'email', placeholder: 'Correo' },
      { type: 'tel', placeholder: 'Teléfono' }
    ]

    expectedFields.forEach((field, index) => {
      expect(inputs[index].attributes('type')).toBe(field.type)
      expect(inputs[index].attributes('placeholder')).toBe(field.placeholder)
    })
  })

  it('has a textarea for messages', () => {
    const wrapper = mount(ContactForm)
    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
    expect(textarea.attributes('placeholder')).toBe('Mensaje')
  })

  it('has a submit button with correct text', () => {
    const wrapper = mount(ContactForm)
    const button = wrapper.find('button[type="submit"]')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Enviar')
  })
}) 