import fs from 'fs';
import path from 'path';

export function getPostsId() {
    const filePath = path.join(process.cwd(),"posts","data.json");
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData);
    const dataIds = data.map(post =>post.id);
    return dataIds;
    
}

export function getPostData(id) {
    const filePath = path.join(process.cwd(),"posts","data.json");
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData);
    const post = data.filter(post => post.id===id);
    console.log(post);
    return post;
}