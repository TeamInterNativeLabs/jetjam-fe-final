import './index.css'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserHeader } from './header'
import { UserFooter } from './footer'
import { useGetProfileQuery } from '../../Redux/Services/User'

export const UserLayout = (props) => {
    const location = useLocation()
    const isHome = location.pathname === '/'
    const token = useSelector((state) => state.authSlice?.token)
    useGetProfileQuery(undefined, { skip: !token, refetchOnFocus: true })

    return (
        <>
            <UserHeader className={props.headerClass?props.headerClass:''}/>
            <div className="user-wrapper-bg">
                {props.children}
                <UserFooter />
            </div>
            <Link
                to={isHome ? '#listen-live' : '/#listen-live'}
                className="listen-live-fab"
                aria-label="Listen Live"
            >
                <span className="listen-live-fab-text">Listen Live</span>
            </Link>
        </>
    )
}
