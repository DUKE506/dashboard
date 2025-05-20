
import { auth } from '@/lib/auth'
import React from 'react'

const Page = async () => {
    const session = await auth();
    if (!session) return <div>Not authenticated</div>
    return (
        <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}

export default Page