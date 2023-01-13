import ImageUploadForm from '../components/ImageUploadForm'
import { useSession, signIn, signOut } from "next-auth/react"
import { getToken } from "next-auth/jwt"

export default function Image() {
    const { data: session } = useSession()
    console.log(session)
    if (session){
        return (
            <div>
                <ImageUploadForm />
            </div>
        )
    } else {
        return (
            <p>Unauthorized</p>
        )
    }
}

