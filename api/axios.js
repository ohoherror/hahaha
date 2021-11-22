
export const myRequest = (url,data,method) => {
    // 调接口加载
    uni.showLoading({
        title: "加载中",
        mask: true,
    });
    return new Promise((resolve, reject) => {
        uni.request({
            url:url,
            //默认参数
            data: data || {},
            // 配置请求头参数-例如token
            header: {
               'Content-Type': 'application/json;charset=UTF-8',
            },
            method:method || 'GET',
            // sslVerify: true,
            // 接口请求成功
            success: (res) => {
                // 关闭加载
                uni.hideLoading();
                console.log('接口所有参数', res);
                if (res.statusCode !== 200) {
                    // 不同报错信息的提示和配置
                    if (res.statusCode == 500) {
                        return uni.showToast({
                            title: '服务器重启中...',
                            icon: "none",
                            mask: true,
                        })
                    } else {
                        return uni.showToast({
                            title: '获取数据失败',
                            icon: "none",
                            mask: true,
                        })
                    }
                }
                // 调用成功且有数据 返回数据  组件内通过 .then() 或者async await 接受异步返回数据
                //resolve(res.data)
                //在接口200 调用成功后 才能进行判断接口内的状态码 return_code 以此判定作何操作和提示
		        const { statusCode, data } = res
		        let return_code = res.data.return_code
		        let return_message = res.data.return_message
		        switch (return_code) {
		          case '0':
		            // 成功的数据data状态码  则直接返回数据
		            resolve(res.data)
		            break
		          case '4011':
		            uni.clearStorage()
		            if (hasUserInfo && !isExisited && !checkToken) {
		              isExisited = true
		              uni.showModal({
		                title: '提示',
		                content: '身份失效，请重新登录！',
		                complete: () => {
		                  uni.reLaunch({ url: '/pages/index/index' })
		                },
		              })
		            } else {
		              reject(res.data)
		            }
		            break
		          default:
		            // 其他的如无特定要求 则做提示
		            // reject(res.data)
		            return uni.showToast({
		              title: return_message || '请求失败',
		              duration: 2000,
		              icon: 'none',
		            })
		        }
            },

            // 接口接口失败
            fail: (error) => {
                // 关闭加载
                uni.hideLoading();
                console.log(2, error);
                uni.showToast({
                    title: '请求接口失败',
                    icon: "none",
                    mask: true,
                })
                // 失败数据
                reject(error)
            }
        })
    })
}
