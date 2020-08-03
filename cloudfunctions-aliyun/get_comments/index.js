'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	
	const {
		user_id,
		article_id,
		page = 1,
		pageSize = 10
	} = event
	
	const list = await db.collection('article')
	.aggregate()
	.match({
		_id: article_id
	})
	.unwind('$comments')
	.project({
		_id: 0,
		comments: 1
	})
	.replaceRoot({
		newRoot: '$comments'
	})
	// 要跳过多少数据
	.skip(pageSize*(page - 1))
	.limit(pageSize)
	.end()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: "数据请求成功",
		data: list.data
	}
};
