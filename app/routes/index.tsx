import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

type IndexData = {
  posts: Array<any>
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async () => {
  const request = await fetch('http://localhost:1337/posts')

  const data: IndexData = {
    posts: await request.json(),
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { posts } = useLoaderData<IndexData>();

  return (
    <div className="remix__page">
      <main>
        {posts.map(post => (
          <article key={post.id} className="remix__page__article">
            <h1>{post.title}</h1>
            <h6>Por {post.users_permissions_user.name}</h6>
            <p>{post.content}</p>
            <a href={`posts/${post.url}`}>Ler mais</a>
          </article>
        ))}
      </main>
      <aside>
        <h2>Posts</h2>
        <ul>
          {posts.map(post => (
            <li key={post.id} className="remix__page__resource">
              <Link to={`posts/${post.url}`} prefetch="intent">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
