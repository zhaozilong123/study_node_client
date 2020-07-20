/**
 * @author 
 * @name 错误处理中间件
 */
module.exports = (options) => {
    return async (ctx, next) => {
        try {
            ([404, 422, 500, 401, 402, 403]).forEach((code) => {
                ctx['e' + code] = (message) => {
                    ctx.status = code
                    ctx.body = {
                        message,
                    }
                }
            })
            await next()
        } catch (e) {
            ctx.status = 500
            ctx.body = {
                message: e.message,
            }
        }
    }
}
  