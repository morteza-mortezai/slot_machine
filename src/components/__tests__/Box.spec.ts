import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Box from '../Box.vue'

describe('Box', () => {
  it('renders properly', () => {
    const wrapper = mount(Box, { props: { choice: 'w' } })
    expect(wrapper.text()).toContain('w')
  })
})
