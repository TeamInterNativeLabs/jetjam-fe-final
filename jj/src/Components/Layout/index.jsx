import './index.css'
import React from 'react'
import { UserHeader } from './header'
import { UserFooter } from './footer'

export const UserLayout = (props) => {
    return (
        <>
            <UserHeader className={props.headerClass?props.headerClass:''}/>
            <div className="user-wrapper-bg">
                {props.children}
                <UserFooter />
            </div>
        </>
    )
}
