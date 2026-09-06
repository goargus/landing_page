import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import HeaderBanner from '../components/HeaderBanner.vue'
import App from '../App.vue'

const ROOT = resolve(import.meta.dirname, '../..')
const readRoot = (relative) => readFileSync(resolve(ROOT, relative), 'utf8')

const mountHero = () =>
  mount(HeaderBanner, {
    props: { title: 'Test' },
    global: { stubs: { 'router-link': true } },
  })

describe('hero image delivery', () => {
  it('offers avif and webp before the fallback', () => {
    const sources = mountHero().findAll('header picture > source')

    expect(sources.map((source) => source.attributes('type'))).toEqual([
      'image/avif',
      'image/webp',
    ])
  })

  it('serves a responsive srcset for every source', () => {
    for (const source of mountHero().findAll('header picture > source')) {
      expect(source.attributes('srcset')).toMatch(/hero-720\.\w+ 720w, \/hero\/hero-1440\.\w+ 1440w/)
      expect(source.attributes('sizes')).toBe('100vw')
    }
  })

  it('carries explicit dimensions and a high loading priority', () => {
    const img = mountHero().find('header picture > img')

    expect(img.attributes('width')).toBe('1440')
    expect(img.attributes('height')).toBe('269')
    expect(img.attributes('fetchpriority')).toBe('high')
    expect(img.attributes('decoding')).toBe('async')
    expect(img.attributes('loading')).toBeUndefined()
  })

  it('is preloaded from the document head at the same widths the markup requests', () => {
    const html = readRoot('index.html')
    const srcset = mountHero().find('header picture > source').attributes('srcset')

    expect(html).toContain('rel="preload"')
    expect(html).toContain('type="image/avif"')
    expect(html).toContain(`imagesrcset="${srcset}"`)
    expect(html).toContain('imagesizes="100vw"')
  })
})

describe('font delivery', () => {
  it('ships Ailerons as a preloaded woff2 that never blocks paint', () => {
    const css = readRoot('src/style.css')
    const html = readRoot('index.html')

    expect(css).toContain("url('/fonts/aileronsTypeFace.woff2') format('woff2')")
    expect(css).toContain('font-display: swap')
    expect(css).not.toContain('.otf')
    expect(html).toContain('href="/fonts/aileronsTypeFace.woff2"')
    expect(html).toMatch(/as="font"[^>]*|rel="preload" as="font"/)
    expect(html).toContain('crossorigin')
  })

  it('applies the display face to the hero heading at any heading level', () => {
    const component = readRoot('src/components/HeaderBanner.vue')
    const heroTitle = component.slice(component.indexOf('.hero-title {'))

    expect(heroTitle).toMatch(/font-family: 'Ailerons', sans-serif;/)
    expect(heroTitle).toMatch(/font-weight: 400;/)
  })

  it('renders the homepage hero as an h1 and every other hero as an h2', () => {
    expect(mountHero().find('header h2.hero-title').exists()).toBe(true)

    const level1 = mount(HeaderBanner, {
      props: { title: 'ARGUS', level: 1 },
      global: { stubs: { 'router-link': true } },
    })

    expect(level1.find('header h1.hero-title').exists()).toBe(true)
  })
})

describe('layout stability', () => {
  it('reserves viewport height for the lazily loaded route so the footer cannot jump', () => {
    const wrapper = mount(App, {
      global: {
        stubs: { 'router-view': true, 'router-link': true, 'navigation-menu': true, 'footer-menu': true },
      },
    })
    const main = wrapper.find('main')

    expect(main.exists()).toBe(true)
    expect(main.classes()).toContain('min-h-screen')
    expect(main.find('router-view-stub').exists()).toBe(true)
  })

  it('gives every intrinsically sized image a width and height', () => {
    for (const file of ['src/components/QuoteBanner.vue', 'src/components/FooterMenu.vue']) {
      const content = readRoot(file)

      expect(content, file).toMatch(/width="\d+"/)
      expect(content, file).toMatch(/height="\d+"/)
    }
  })
})

describe('raster payload', () => {
  it('imports the compressed derivatives rather than the png sources', () => {
    expect(readRoot('src/components/PortfolioOfPages.vue')).toContain("'../assets/mockup.webp'")
    expect(readRoot('src/components/QuoteBanner.vue')).toContain("'../assets/websiteDesign3.webp'")
    expect(readRoot('src/components/HeaderBanner.vue')).not.toContain('Bannerpicture.png')
  })
})
