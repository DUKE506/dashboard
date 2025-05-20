


import { signOut } from '@/lib/auth'
import React from 'react'

const SignOut = () => {
    return (
        <form action={async () => {
            'use server'
            await signOut()
        }}>
            <button type='submit'>Sign Out</button>
        </form>
    )
}

export default SignOut