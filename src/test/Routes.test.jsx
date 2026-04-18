import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import SubscriptionConfirm from '../Pages/SubscriptionConfirm/index.jsx'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('../Components/Layout', () => ({
    UserLayout: ({ children }) => <div>{children}</div>
}))
vi.mock('../Components/Loader', () => ({
    default: () => null
}))
vi.mock('../Redux/Services/Subscription', () => ({
    useConfirmSubscriptionMutation: () => [vi.fn(), { isLoading: false, isSuccess: false, isError: false }]
}))

// ── Helpers ────────────────────────────────────────────────────────────────

const authSlice = createSlice({
    name: 'authSlice',
    initialState: { isLoggedIn: false, token: null },
    reducers: {
        setLoggedIn: (state) => { state.isLoggedIn = true; state.token = 'tok' }
    }
})

function makeStore(loggedIn = false) {
    const store = configureStore({ reducer: { authSlice: authSlice.reducer } })
    if (loggedIn) store.dispatch(authSlice.actions.setLoggedIn())
    return store
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('Route: /subscription-confirm (no PrivateRoute wrapper)', () => {

    it('is accessible without login — shows inline prompt, NOT /login page', () => {
        render(
            <Provider store={makeStore(false)}>
                <MemoryRouter initialEntries={['/subscription-confirm?subscription_id=I-TEST']}>
                    <Routes>
                        <Route path="/subscription-confirm" element={<SubscriptionConfirm />} />
                        <Route path="/login" element={<div data-testid="login-page" />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )
        expect(screen.queryByTestId('login-page')).not.toBeInTheDocument()
        expect(screen.getByText(/please log in to complete your subscription/i)).toBeInTheDocument()
    })

    it('does NOT redirect logged-in user away from /subscription-confirm', () => {
        render(
            <Provider store={makeStore(true)}>
                <MemoryRouter initialEntries={['/subscription-confirm?subscription_id=I-TEST']}>
                    <Routes>
                        <Route path="/subscription-confirm" element={<SubscriptionConfirm />} />
                        <Route path="/login" element={<div data-testid="login-page" />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )
        expect(screen.queryByTestId('login-page')).not.toBeInTheDocument()
        expect(screen.queryByText(/please log in/i)).not.toBeInTheDocument()
    })
})
