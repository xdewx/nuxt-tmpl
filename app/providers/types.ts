import type { Component } from 'vue'
import type {
  AuthProviderId, AuthUser, AuthResult,
  AuthSignInData, AuthSignUpData,
} from '#shared/types/auth'
import type { H3Event } from 'h3'

export interface AuthProvider {
  readonly id: AuthProviderId | "none";

  user: Ref<AuthUser | null>;
  isLoaded: Ref<boolean>;
  isSignedIn: Ref<boolean>;

  signIn(data: AuthSignInData): Promise<AuthResult>;
  signUp(data: AuthSignUpData): Promise<AuthResult>;
  signOut(): Promise<void>;
  signInWithOAuth(provider: string): Promise<void>;

  openSignIn?(): Promise<void>;
  openSignUp?(): Promise<void>;
  openUserProfile?(): Promise<void>;

  SignInForm?: Component;
  SignUpForm?: Component;

  serverMiddleware?(event: H3Event): Promise<void>;
}

