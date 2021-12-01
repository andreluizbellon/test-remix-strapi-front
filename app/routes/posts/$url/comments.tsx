import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";

type PostData = {
  comments: any
}

export const loader: LoaderFunction = async({ params }) => {
  const request = await fetch(`http://localhost:1337/comments?post.url=${params.url}`);
  
  return {
    comments: await request.json()
  }
}

export default function Comments() {
  const { comments } = useLoaderData<PostData>();

  return (
    <section className="remix__page__comment__section">
      <h2>Comentários</h2>
      {comments.length ? (
        comments.map((comment: any) => (
          <article key={comment.id}>
            <p>{comment.comment}</p>
            <h6>Por {comment.users_permissions_user.name}</h6>
          </article>
        ))
      ) : (
        <p>Sem comentários</p>
      )}
    </section>
  )
}
