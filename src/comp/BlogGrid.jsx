// import Grid from './UIkit/Grid';
//import blogArr & map here
import React from "react";
// import { blogPosts } from "../config/blog";
import { BlogPost } from "./BlogPost";
import { v4 as uuidv4 } from 'uuid';
//blog images here: (how can I make it even easier?)
import ant_rock from '../img/ant_rock.jpg';
import cumbia from '../img/Cumbia.png';
import kuduro from '../img/Kuduro.jpg';

export const BlogGrid = () => {
    const blogPosts = [
        {
            title: 'Anatalian Rock',
            snippet: 'ב-1923, הגיעו לקיצן יותר מ-600 שנות קיום של האימפריה ה-',
            content: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
            imgSrc: ant_rock,
            // urlParam: 'or-should-it-be-route?',
            link: 'https://www.mixcloud.com/roman-ostrovsky/turkish-gold/',
        },
        {
            title: 'Cumbia',
            snippet: '"האנשים העניים, חופשיים ועבדים, חומים, שחורים , פועלים',
            content: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
            imgSrc: cumbia,
            //imgSrc will be replaced for more convenice to romka somehow
            // urlParam: 'or-should-it-be-route?',
            link: '',
        },
        {
            title: 'Kuduro',
            snippet: '"קודורו זו אמנות, קודורו זה ריקוד, קודורו זו תרבות...',
            content: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
            imgSrc: kuduro,
            //imgSrc will be replaced for more convenice to romka somehow
            // urlParam: 'or-should-it-be-route?',
            link: '',
        },
    ]
    return (
        <div key="blog-grid" className="blog-grid">
            {blogPosts.map((eachPost)=>
            <BlogPost
            key={uuidv4()}
            props={eachPost}
            >
            </BlogPost>
            )}
        </div>

    )
}