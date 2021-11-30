import type { LoaderFunction, MetaFunction } from "remix";
import { useLoaderData, useCatch } from "remix";

type PostData = {
  post: any,
  comments: any
}

export const loader: LoaderFunction = async({ params }) => {
  const request = await fetch(`http://localhost:1337/posts?url=${params.url}`)
  const posts = await request.json() as Array<any>

  if (!posts.length) {
    throw new Response("Not Found", { status: 404 });
  }

  const post = posts[0]
  const requestComments = await fetch(`http://localhost:1337/comments?post.id=${post.id}`)

  return {
    post,
    comments: await requestComments.json()
  } as PostData
}

export const meta: MetaFunction = ({ data = {} }) => {

  return {
    title: data?.post?.title,
    description: ""
  };
};

export default function Posts() {
  const { post, comments } = useLoaderData<PostData>();

  return (
    <main>
      <h1>{post.title}</h1>
      <h6>Por {post.users_permissions_user.name}</h6>
      <p>{post.content}</p>
      <section className="remix__page__comment__section">
        <h2>Comments</h2>
        {comments.map((comment: any) => (
          <article>
            <p>{comment.comment}</p>
            <h6>Por {comment.users_permissions_user.name}</h6>
          </article>
        ))}
      </section>
    </main>
  )
}
