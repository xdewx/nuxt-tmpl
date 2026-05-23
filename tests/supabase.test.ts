import { describe, it, expect } from 'vitest'
import { toUser } from '../app/providers/supabase'

describe('toUser', () => {
  it('returns null for null input', () => {
    expect(toUser(null)).toBeNull()
  })

  it('returns null for undefined input', () => {
    expect(toUser(undefined)).toBeNull()
  })

  it('maps a valid supabase user object', () => {
    const sbUser = {
      id: 'user-123',
      email: 'test@example.com',
      user_metadata: {
        name: 'John Doe',
        avatar_url: 'https://example.com/avatar.png',
      },
      created_at: '2024-01-15T10:00:00Z',
    }
    const result = toUser(sbUser)
    expect(result).toEqual({
      id: 'user-123',
      email: 'test@example.com',
      name: 'John Doe',
      avatarUrl: 'https://example.com/avatar.png',
      createdAt: new Date('2024-01-15T10:00:00Z'),
    })
  })

  it('falls back to full_name when name is missing', () => {
    const sbUser = {
      id: 'user-456',
      email: 'jane@example.com',
      user_metadata: {
        full_name: 'Jane Smith',
      },
      created_at: '2024-03-20T08:30:00Z',
    }
    const result = toUser(sbUser)
    expect(result).toEqual({
      id: 'user-456',
      email: 'jane@example.com',
      name: 'Jane Smith',
      avatarUrl: null,
      createdAt: new Date('2024-03-20T08:30:00Z'),
    })
  })

  it('falls back to picture when avatar_url is missing', () => {
    const sbUser = {
      id: 'user-789',
      email: 'bob@example.com',
      user_metadata: {
        name: 'Bob',
        picture: 'https://example.com/pic.jpg',
      },
      created_at: '2024-06-10T12:00:00Z',
    }
    const result = toUser(sbUser)
    expect(result).toEqual({
      id: 'user-789',
      email: 'bob@example.com',
      name: 'Bob',
      avatarUrl: 'https://example.com/pic.jpg',
      createdAt: new Date('2024-06-10T12:00:00Z'),
    })
  })

  it('handles missing email and metadata gracefully', () => {
    const sbUser = {
      id: 'user-000',
      email: null,
      created_at: '2024-01-01T00:00:00Z',
    }
    const result = toUser(sbUser)
    expect(result).toEqual({
      id: 'user-000',
      email: '',
      name: '',
      avatarUrl: null,
      createdAt: new Date('2024-01-01T00:00:00Z'),
    })
  })
})
