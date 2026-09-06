import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import HeaderBanner from '../components/HeaderBanner.vue'

const SRC = resolve(__dirname, '..')

const collectFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : collectFiles(full)
    return /\.(vue|html|js|ts)$/.test(entry.name) ? [full] : []
  })

describe('reduced motion', () => {
  const css = readFileSync(join(SRC, 'style.css'), 'utf8')

  it('guards animations behind prefers-reduced-motion', () => {
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
  })

  it('shortens animations instead of removing them, so opacity-0 elements still resolve visible', () => {
    const block = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'))

    expect(block).toMatch(/animation-duration:\s*0\.01ms\s*!important/)
    expect(block).not.toMatch(/animation:\s*none/)
  })

  it('neutralises the staggered animation delays', () => {
    const block = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'))

    expect(block).toMatch(/animation-delay:\s*-?0(\.01ms|s)?\s*!important/)
    expect(block).toMatch(/animation-iteration-count:\s*1\s*!important/)
  })
})

describe('image alt text', () => {
  it('marks the hero banner as decorative', () => {
    const wrapper = mount(HeaderBanner, {
      props: { title: 'Test' },
      global: { stubs: { 'router-link': true } }
    })
    const banner = wrapper.find('header > img')

    expect(banner.exists()).toBe(true)
    expect(banner.attributes('alt')).toBe('')
  })
})

describe('links that open a new tab', () => {
  it('always carry rel="noopener noreferrer"', () => {
    const offenders = []

    for (const file of collectFiles(SRC)) {
      const content = readFileSync(file, 'utf8')
      if (!content.includes('target="_blank"')) continue

      for (const anchor of content.split('<a').slice(1)) {
        const tag = anchor.slice(0, anchor.indexOf('>'))
        if (tag.includes('target="_blank"') && !tag.includes('noopener')) {
          offenders.push(file)
        }
      }
    }

    expect(offenders).toEqual([])
  })
})
