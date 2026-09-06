import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ContactForm from '../../components/ContactForm.vue'

const SUCCESS_MESSAGE = '¡Mensaje enviado con éxito!'
const ERROR_MESSAGE = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
const SEND_FAILED_MESSAGE = 'No pudimos enviar tu mensaje por un problema con nuestro proveedor de correo. Por favor, inténtalo de nuevo en unos minutos o escríbenos directamente.'
const THROTTLE_MESSAGE_SNIPPET = 'Espera unos segundos'

const filledForm = {
  name: 'John',
  lastName: 'Doe',
  email: 'test@example.com',
  phone: '+1 (234) 567-8900',
  message: 'This is a test message with more than 10 characters',
}

function jsonResponse(body, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => body }
}

async function fillForm(wrapper) {
  await wrapper.find('input[name="name"]').setValue(filledForm.name)
  await wrapper.find('input[name="lastName"]').setValue(filledForm.lastName)
  await wrapper.find('input[name="email"]').setValue(filledForm.email)
  await wrapper.find('input[name="phone"]').setValue(filledForm.phone)
  await wrapper.find('textarea').setValue(filledForm.message)
}

async function submitFilledForm() {
  const wrapper = mount(ContactForm)
  await fillForm(wrapper)
  await wrapper.find('form').trigger('submit.prevent')
  await flushPromises()
  return wrapper
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('Mounts properly', () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.exists()).toBe(true)
  })

  it('Has required form fields', () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.findAll('input[required]').length).toBe(4)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('Renders all input fields with correct attributes', () => {
    const wrapper = mount(ContactForm)
    const inputs = wrapper.findAll('input[required]')

    const expectedFields = [
      { type: 'text', placeholder: 'Nombre', pattern: '^[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+$', title: 'El nombre solo puede contener letras y espacios' },
      { type: 'text', placeholder: 'Apellido', pattern: '^[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+$', title: 'El apellido solo puede contener letras y espacios' },
      { type: 'email', placeholder: 'Correo', title: 'Por favor ingresa un correo electrónico válido' },
      { type: 'tel', placeholder: 'Teléfono', pattern: '^[\\d\\s+()\\-]+$', title: 'El teléfono solo puede contener números, espacios, +, paréntesis y guiones' }
    ]

    expectedFields.forEach((field, index) => {
      expect(inputs[index].attributes('type')).toBe(field.type)
      expect(inputs[index].attributes('placeholder')).toBe(field.placeholder)
      if (field.pattern) {
        expect(inputs[index].attributes('pattern')).toBe(field.pattern)
      }
      expect(inputs[index].attributes('title')).toBe(field.title)
      expect(inputs[index].attributes('required')).toBeDefined()
    })
  })

  it('Has a textarea for messages with correct attributes', () => {
    const wrapper = mount(ContactForm)
    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
    expect(textarea.attributes('placeholder')).toBe('Mensaje')
    expect(textarea.attributes('minlength')).toBe('5')
    expect(textarea.attributes('title')).toBe('El mensaje debe tener al menos 5 caracteres')
    expect(textarea.attributes('required')).toBeDefined()
  })

  it('Has a submit button with correct text', () => {
    const wrapper = mount(ContactForm)
    const button = wrapper.find('button[type="submit"]')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Enviar')
  })

  it('Posts the form values to the contact endpoint on submit', async () => {
    fetch.mockResolvedValue(jsonResponse({ ok: true }))

    await submitFilledForm()

    expect(fetch).toHaveBeenCalledTimes(1)

    const [url, options] = fetch.mock.calls[0]
    expect(url).toBe('/api/contact')
    expect(options.method).toBe('POST')
    expect(options.headers['content-type']).toBe('application/json')
    expect(JSON.parse(options.body)).toEqual(filledForm)
  })

  it('Never sends a credential from the browser', async () => {
    fetch.mockResolvedValue(jsonResponse({ ok: true }))

    await submitFilledForm()

    const [, options] = fetch.mock.calls[0]
    expect(options.headers.authorization).toBeUndefined()
    expect(JSON.stringify(options)).not.toMatch(/api[_-]?key|bearer|re_/i)
  })

  it('Shows the success feedback when the request resolves', async () => {
    fetch.mockResolvedValue(jsonResponse({ ok: true }))

    const wrapper = await submitFilledForm()
    const feedback = wrapper.find('.message-feedback')

    expect(feedback.exists()).toBe(true)
    expect(feedback.text()).toBe(SUCCESS_MESSAGE)
    expect(feedback.classes()).toContain('message-success')
    expect(wrapper.find('button[type="submit"]').text()).toBe('Enviar')
    expect(wrapper.find('input[name="name"]').element.value).toBe('')
    expect(wrapper.find('textarea').element.value).toBe('')
  })

  it('Shows the error feedback when the endpoint returns a failure status', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    fetch.mockResolvedValue(jsonResponse({ error: 'not_configured' }, 500))

    const wrapper = await submitFilledForm()
    const feedback = wrapper.find('.message-feedback')

    expect(feedback.exists()).toBe(true)
    expect(feedback.text()).toBe(ERROR_MESSAGE)
    expect(feedback.classes()).toContain('message-error')
    expect(wrapper.find('textarea').element.value).toBe(filledForm.message)
    expect(consoleError).toHaveBeenCalledTimes(1)

    consoleError.mockRestore()
  })

  it('Shows a distinct message when the email provider fails to send (quota or outage)', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    fetch.mockResolvedValue(jsonResponse({ error: 'send_failed' }, 502))

    const wrapper = await submitFilledForm()
    const feedback = wrapper.find('.message-feedback')

    expect(feedback.exists()).toBe(true)
    expect(feedback.text()).toBe(SEND_FAILED_MESSAGE)
    expect(feedback.classes()).toContain('message-error')
    expect(feedback.text()).not.toBe(ERROR_MESSAGE)
    expect(consoleError).toHaveBeenCalledTimes(1)

    consoleError.mockRestore()
  })

  it('Shows the error feedback when the request itself rejects', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    fetch.mockRejectedValue(new TypeError('Failed to fetch'))

    const wrapper = await submitFilledForm()
    const feedback = wrapper.find('.message-feedback')

    expect(feedback.text()).toBe(ERROR_MESSAGE)
    expect(feedback.classes()).toContain('message-error')
    expect(wrapper.find('textarea').element.value).toBe(filledForm.message)
    expect(consoleError).toHaveBeenCalledTimes(1)

    consoleError.mockRestore()
  })

  it('Announces feedback messages through a live region', async () => {
    fetch.mockResolvedValue(jsonResponse({ ok: true }))

    const wrapper = await submitFilledForm()
    const liveRegion = wrapper.find('[aria-live="polite"]')

    expect(liveRegion.exists()).toBe(true)
    expect(liveRegion.attributes('role')).toBe('status')
    expect(liveRegion.text()).toBe(SUCCESS_MESSAGE)
  })

  it('Hides the honeypot field from sighted users and assistive tech', () => {
    const wrapper = mount(ContactForm)
    const honeypot = wrapper.find('input[name="website"]')

    expect(honeypot.exists()).toBe(true)
    expect(honeypot.attributes('tabindex')).toBe('-1')
    expect(honeypot.attributes('autocomplete')).toBe('off')
    expect(honeypot.attributes('required')).toBeUndefined()

    const hiddenContainer = honeypot.element.closest('[aria-hidden="true"]')
    expect(hiddenContainer).not.toBeNull()
    expect(hiddenContainer.classList.contains('hp-field')).toBe(true)
  })

  it('Silently discards the submission when the honeypot field is filled', async () => {
    fetch.mockResolvedValue(jsonResponse({ ok: true }))

    const wrapper = mount(ContactForm)
    await fillForm(wrapper)
    await wrapper.find('input[name="website"]').setValue('http://spam.example')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(fetch).not.toHaveBeenCalled()
    expect(wrapper.find('.message-feedback').exists()).toBe(false)
  })

  it('Rejects a second submission within the throttle window', async () => {
    fetch.mockResolvedValue(jsonResponse({ ok: true }))

    const wrapper = mount(ContactForm)
    await fillForm(wrapper)
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(fetch).toHaveBeenCalledTimes(1)

    await fillForm(wrapper)
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(fetch).toHaveBeenCalledTimes(1)

    const feedback = wrapper.find('.message-feedback')
    expect(feedback.exists()).toBe(true)
    expect(feedback.text()).toContain(THROTTLE_MESSAGE_SNIPPET)
    expect(feedback.classes()).toContain('message-error')
  })

  it('Allows a normal visitor to submit again once the throttle window has passed', async () => {
    fetch.mockResolvedValue(jsonResponse({ ok: true }))
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))

    const wrapper = mount(ContactForm)
    await fillForm(wrapper)
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    vi.setSystemTime(new Date('2026-01-01T00:00:31Z'))

    await fillForm(wrapper)
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    vi.useRealTimers()

    expect(fetch).toHaveBeenCalledTimes(2)
  })
})
