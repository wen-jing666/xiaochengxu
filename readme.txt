小程序新目录结构、说明

|-pages							页面
		|-index 					首页
		|-find						发现
		|-lookinto					投票
		|-release					发布心得
		|-detail					心得详情

		
		
|-utils  						工具库/
		|-util.js  					工具方法
		|-api.js 					接口



小程序只允许2000KB的文档，所以所有的图片和ICON都必须放到服务器。

现在暂时把图片存放在img目录下，需要后台将所有图片放到服务器进行修改图片路径