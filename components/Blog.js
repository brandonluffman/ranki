import axios from 'axios';

export async function getServerSideProps() {
    // Replace this URL with your API endpoint
    const res = await axios.get('https://your-api-endpoint.com/blogs');
    const blogs = res.data;

    // Pass the blogs data to the page via props
    return { props: { blogs } };
}

export default function Blog({ blogs }) {
    return (
        <div>
            <h1>Blog Posts</h1>
            {/* Render your blogs here */}
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                        {/* Render other blog details */}
                    </li>
                ))}
            </ul>
        </div>
    );
}
