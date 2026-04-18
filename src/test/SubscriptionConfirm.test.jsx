import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import SubscriptionConfirm from '../Pages/SubscriptionConfirm/index.jsx'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('../Components/Layout', () => ({
    UserLayout: ({ children }) => <div data-testid="layout">{children}</div>
}))
vi.mock('../Components/Loader', () => ({
    default: ({ loading }) => loading ? <div data-testid="loader" /> : null
}))

const mockConfirmSubscription = vi.fn()
let mockMutationState = { isLoading: false, isSuccess: false, isError: false, error: null }

vi.mock('../Redux/Services/Subscription', () => ({
    useConfirmSubscriptionMutation: () => [mockConfirmSubscription, mockMutationState]
}))

// ── Helpers ────────────────────────────────────────────────────────────────

const authSlice = createSlice({
    name: 'authSlice',
    initialState: { isLoggedIn: false, token: null },
    reducers: {
        setLoggedIn: (state) => { state.isLoggedIn = true; state.token = 'test-token' }
    }
})

function makeStore(loggedIn = false) {
    const store = configureStore({ reducer: { authSlice: authSlice.reducer } })
    if (loggedIn) store.dispatch(authSlice.actions.setLoggedIn())
    return store
}

function renderConfirmPage(url = '/subscription-confirm?subscription_id=I-TEST123', loggedIn = false) {
    return render(
        <Provider store={makeStore(loggedIn)}>
            <MemoryRouter initialEntries={[url]}>
                <Routes>
                    <Route path="/subscription-confirm" element={<SubscriptionConfirm />} />
                    <Route path="/login" element={<div data-testid="login-page" />} />
                    <Route path="/subscription-logs" element={<div data-testid="logs-page" />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    )
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('SubscriptionConfirm', () => {

    beforeEach(() => {
        vi.clearAllMocks()
        mockMutationState = { isLoading: false, isSuccess: false, isError: false, error: null }
    })

    it('shows login prompt when user is NOT logged in', () => {
        renderConfirmPage('/subscription-confirm?subscription_id=I-TEST123', false)
        expect(screen.getByText(/please log in to complete your subscription/i)).toBeInTheDocument()
    })

    it('does NOT call confirmSubscription when user is not logged in', () => {
        renderConfirmPage('/subscription-confirm?subscription_id=I-TEST123', false)
        expect(mockConfirmSubscription).not.toHaveBeenCalled()
    })

    it('calls confirmSubscription with subscription_id when user IS logged in', () => {
        renderConfirmPage('/subscription-confirm?subscription_id=I-TEST123', true)
        expect(mockConfirmSubscription).toHaveBeenCalledWith('I-TEST123')
    })

    it('calls confirmSubscription only once', () => {
        renderConfirmPage('/subscription-confirm?subscription_id=I-TEST123', true)
        expect(mockConfirmSubscription).toHaveBeenCalledTimes(1)
    })

    it('shows loader when isLoading is true', () => {
        mockMutationState = { isLoading: true, isSuccess: false, isError: false, error: null }
        renderConfirmPage('/subscription-confirm?subscription_id=I-TEST123', true)
        expect(screen.getByTestId('loader')).toBeInTheDocument()
    })

    it('shows success message when isSuccess is true', () => {
        mockMutationState = { isLoading: false, isSuccess: true, isError: false, error: null }
        renderConfirmPage('/subscription-confirm?subscription_id=I-TEST123', true)
        expect(screen.getByText(/subscription confirmed/i)).toBeInTheDocument()
    })

    it('shows error message when isError is true', () => {
        mockMutationState = {
            isLoading: false, isSuccess: false, isError: true,
            error: { data: { message: 'Subscription failed' } }
        }
        renderConfirmPage('/subscription-confirm?subscription_id=I-TEST123', true)
        expect(screen.getByText(/subscription failed/i)).toBeInTheDocument()
    })

    it('does NOT call confirmSubscription when subscription_id is missing', () => {
        renderConfirmPage('/subscription-confirm', true)
        expect(mockConfirmSubscription).not.toHaveBeenCalled()
    })

    it('does NOT redirect to /login page — shows inline prompt instead', () => {
        renderConfirmPage('/subscription-confirm?subscription_id=I-TEST123', false)
        expect(screen.queryByTestId('login-page')).not.toBeInTheDocument()
        expect(screen.getByText(/please log in to complete your subscription/i)).toBeInTheDocument()
    })
})
