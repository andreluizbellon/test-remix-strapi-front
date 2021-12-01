import type { LoaderFunction, MetaFunction } from "remix";
import { Link, Outlet, useLoaderData } from "remix";
import { useLocation } from 'react-router-dom'

type PostData = {
  post: any,
  comments: any
}

export const loader: LoaderFunction = async({ params }) => {
  const request = await fetch(`http://localhost:1337/posts?url=${params.url}`);
  const posts = await request.json() as Array<any>;

  if (!posts.length) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    post: posts[0],
  } as PostData
}

export const meta: MetaFunction = ({ data = {} }) => {

  return {
    title: data?.post?.title,
    description: ""
  };
};

export default function Posts() {
  const { post } = useLoaderData<PostData>();
  const location = useLocation();

  return (
    <main>
      <h1>{post.title}</h1>
      <h6>Por {post.users_permissions_user.name}</h6>
      <p>{post.content}</p>
      {!location.pathname.endsWith('/comments') ? (
        <Link to="comments">Carregar comentários</Link>
      ) : null}
      <Outlet />
    </main>
  )
}
