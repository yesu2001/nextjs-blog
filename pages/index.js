import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
// import {getSortedPostsData} from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data,setData] = useState([]);

  const fetchData = () => {
    fetch('api/hello')
    .then((response) => response.json())
    .then(result => setData(result.data))
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchData();
  }, [])

  
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm Yesu. I'm a frontend Developer.</p>
        <Link href='/blog/create' ><button className={utilStyles.addBlog}>Create a blog</button></Link>
      </section>
      <section className={`${utilStyles.headingMD} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {
            data.map(({id,title,date}) => (
              <li className={utilStyles.listItem} key={id}> 
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                {/* <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small> */}
                <span className={utilStyles.lightText}>{date}</span>
              </li>
            ))
          }
        </ul>
      </section>
    </Layout>
  );
}