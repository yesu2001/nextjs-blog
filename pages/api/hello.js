import path from 'path';
import fs from 'fs';

export default function handler(req,res) {
	if(req.method === 'GET') {
		const filePath = path.join(process.cwd(),'posts','data.json');
		const fileData = fs.readFileSync(filePath);
		const data = JSON.parse(fileData);
		return res.status(200).json({'data': data})
	}
	else if(req.method === 'POST') {
		var currentDate = new Date()
		var day = currentDate.getDate()
		var month = currentDate.getMonth() + 1
		var year = currentDate.getFullYear()
		var date = `${day}-${month}-${year}`
		
		const {title,content} = req.body;
		const newBlog = {
			id: (Date.now()).toString(),
			title,
			date: date,
			content,
		}
		
		const filePath = path.join(process.cwd(),'posts','data.json');
		const fileData = fs.readFileSync(filePath);
		const data = JSON.parse(fileData);
		data.push(newBlog);
		fs.writeFileSync(filePath, JSON.stringify(data));
		return res.status(201).json({newPost: newBlog});
	}
}