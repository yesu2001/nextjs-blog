import Layout from '../../components/Layout';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { getPostData, getPostsId } from '../../lib/posts';

export default function Post({post}) {
	var post = post[0];
	return (
		<Layout>
			<Head>
				<title>{post.title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXl}>{post.title}</h1>
				{/* <div className={utilStyles.lightText}>
		          <Date dateString={post.date} />
		        </div> */}
				<p>{post.date}</p>
				<p>{post.content}</p>
			    {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
			</article>
		</Layout>
	)
}


export async function getStaticPaths() {
	// return a list of possible value for id
	const paths = getPostsId();
	console.log(paths);
	const allPaths = paths.map(path => {
		console.log(path);
		return {
			params: {
				id: path
			},
		}
	})
	return {
		paths: allPaths,
		fallback:false,
	}
}


export async function getStaticProps({ params }) {
	// fetch neccessary data for the blog post using params.id
	const post = getPostData(params.id);

	return {
		props: {post},
	}
}

