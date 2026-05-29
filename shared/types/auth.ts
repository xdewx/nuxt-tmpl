import type { ApiResponse } from "@ipa-schema/api"

export type AuthProviderId = 'clerk' | 'better-auth' | 'supabase'

export interface AuthUser {
  id: string
  email: string
  name: string
  avatarUrl: string | null
  createdAt: Date
}

export interface AuthSession {
  user: AuthUser
  sessionId: string
  expiresAt: Date
}

export interface AuthSignInData {
  email: string
  password: string
}

export interface AuthSignUpData extends AuthSignInData {
  name?: string
}

export type AuthResult = ApiResponse
