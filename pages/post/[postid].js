
import { useRouter } from "next/router"

const PostId = ({data}) => {
    // console.log({data})
    const router = useRouter()
    // console.log(router)
    return (
        <>
        {/* <div>{data?.title}</div> */}
        <div>sfgarg</div>
        </>
    )
}

export default PostId;


export async function getStaticPaths() {
    return {
        paths: [
            { params: { postid: '1' } },
            { params: { postid: '2' } }
        ],
        fallback: false
    }
}


export async function getStaticProps({params}) {

    // const result = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postid}`)
    // const data = await result.json()

    return {
        props: {}
    }
}


