import { describe, it, expect, vi } from 'vitest'
import { loginUser, registerUser, fetchUsers } from './api'

describe('api helpers', () => {
  it('loginUser posts credentials', async () => {
    const mock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) })
    // @ts-ignore
    global.fetch = mock
    const res = await loginUser('user', 'pass')
    expect(mock).toHaveBeenCalledWith('/login', expect.objectContaining({ method: 'POST' }))
    expect(res).toEqual({ success: true })
  })

  it('registerUser posts data', async () => {
    const mock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ username: 'u' }) })
    // @ts-ignore
    global.fetch = mock
    const res = await registerUser('u', 'p')
    expect(mock).toHaveBeenCalledWith('/users', expect.objectContaining({ method: 'POST' }))
    expect(res).toEqual({ username: 'u' })
  })

  it('fetchUsers handles error', async () => {
    const mock = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    // @ts-ignore
    global.fetch = mock
    const res = await fetchUsers()
    expect(res).toEqual([])
  })
})
