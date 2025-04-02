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

  describe('Form Validations', () => {
    it('validates name and last name fields', async () => {
      const wrapper = mount(ContactForm)
      const nameInput = wrapper.find('input[placeholder="Nombre"]')
      const lastNameInput = wrapper.find('input[placeholder="Apellido"]')

      // Test empty field
      await nameInput.setValue('')
      await nameInput.trigger('input')
      expect(wrapper.vm.errors.name).toBe('Este campo es obligatorio')

      // Test invalid characters
      await nameInput.setValue('John123')
      await nameInput.trigger('input')
      expect(wrapper.vm.errors.name).toBe('Solo letras y espacios')

      // Test valid input
      await nameInput.setValue('John Doe')
      await nameInput.trigger('input')
      expect(wrapper.vm.errors.name).toBe('')

      // Test last name validation
      await lastNameInput.setValue('Smith123')
      await lastNameInput.trigger('input')
      expect(wrapper.vm.errors.lastName).toBe('Solo letras y espacios')
    })

    it('validates email field', async () => {
      const wrapper = mount(ContactForm)
      const emailInput = wrapper.find('input[placeholder="Correo"]')

      // Test empty field
      await emailInput.setValue('')
      await emailInput.trigger('input')
      expect(wrapper.vm.errors.email).toBe('El correo es obligatorio')

      // Test invalid email
      await emailInput.setValue('invalid-email')
      await emailInput.trigger('input')
      expect(wrapper.vm.errors.email).toBe('Correo inválido')

      // Test valid email
      await emailInput.setValue('test@example.com')
      await emailInput.trigger('input')
      expect(wrapper.vm.errors.email).toBe('')
    })

    it('validates phone field', async () => {
      const wrapper = mount(ContactForm)
      const phoneInput = wrapper.find('input[placeholder="Teléfono"]')

      // Test empty field
      await phoneInput.setValue('')
      await phoneInput.trigger('input')
      expect(wrapper.vm.errors.phone).toBe('El teléfono es obligatorio')

      // Test invalid format
      await phoneInput.setValue('1234567890')
      await phoneInput.trigger('input')
      expect(wrapper.vm.errors.phone).toBe('Formato inválido (Ejemplo: (+504) 9999-9999 o (+1) 123-456-7890)')

      // Test valid format
      await phoneInput.setValue('(+504) 9999-9999')
      await phoneInput.trigger('input')
      expect(wrapper.vm.errors.phone).toBe('')
    })
  })
}) 