import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import Login from '../Pages/Auth/login.jsx'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('../Components/Layout', () => ({
    UserLayout: ({ children }) => <div>{children}</div>
}))
vi.mock('../Components/Loader', () => ({
    default: () => null
}))
vi.mock('react-toastify', () => ({
    toast: { success: vi.fn(), error: vi.fn() }
}))

const mockLogin = vi.fn()
let mockLoginState = { data: null, isSuccess: false, isLoading: false }

vi.mock('../Redux/Services/Auth', () => ({
    useLoginMutation: () => [mockLogin, mockLoginState]
}))

// ── Helpers ────────────────────────────────────────────────────────────────

const authSlice = createSlice({
    name: 'authSlice',
    initialState: { isLoggedIn: false },
    reducers: {}
})

function makeStore() {
    return configureStore({ reducer: { authSlice: authSlice.reducer } })
}

function renderLogin(url = '/login') {
    return render(
        <Provider store={makeStore()}>
            <MemoryRouter initialEntries={[url]}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/subscription-confirm" element={<div data-testid="confirm-page" />} />
                    <Route path="/" element={<div data-testid="home-page" />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    )
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('Login page', () => {

    beforeEach(() => {
        vi.clearAllMocks()
        mockLoginState = { data: null, isSuccess: false, isLoading: false }
    })

    it('renders email and password fields', () => {
        renderLogin()
        expect(screen.getByPlaceholderText(/enter email address/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument()
    })

    it('renders Log In button', () => {
        renderLogin()
        expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
    })

    it('redirects to ?redirect param URL after successful login', async () => {
        const redirectUrl = encodeURIComponent('/subscription-confirm?subscription_id=I-TEST123')
        mockLoginState = { data: { message: 'Logged in' }, isSuccess: true, isLoading: false }
        renderLogin(`/login?redirect=${redirectUrl}`)
        await waitFor(() => {
            expect(screen.getByTestId('confirm-page')).toBeInTheDocument()
        })
    })

    it('stays on login page when login has not succeeded', () => {
        const redirectUrl = encodeURIComponent('/subscription-confirm?subscription_id=I-TEST123')
        mockLoginState = { data: null, isSuccess: false, isLoading: false }
        renderLogin(`/login?redirect=${redirectUrl}`)
        expect(screen.queryByTestId('confirm-page')).not.toBeInTheDocument()
        expect(screen.getByPlaceholderText(/enter email address/i)).toBeInTheDocument()
    })

    it('shows Forgot Password link', () => {
        renderLogin()
        expect(screen.getByText(/forgot password/i)).toBeInTheDocument()
    })

    it('shows Sign Up Now link', () => {
        renderLogin()
        expect(screen.getByText(/sign up now/i)).toBeInTheDocument()
    })
})
