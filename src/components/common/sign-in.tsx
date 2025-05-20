

import { signIn } from '@/lib/auth'
import React from 'react'

const SignIn = () => {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("kakao", { redirectTo: '/dashboard' })
            }}
        >
            <button type="submit">Signin with Kakao</button>
        </form>
    )

}

export default SignIn