import Koa from 'koa'

export default function(debug: boolean = null) {
  return async function(ctx: Koa.Context, next: () => Promise<void>) {
    
    const startTime = new Date().getTime()
    const path = ctx.request.path

    try {
      await next()
      const data: any = ctx.body
      if (ctx.status >= 400) {
        return ctx.throw(ctx.body, ctx.status)
      }

      if (ctx.method.toLowerCase() !== 'option') {
        if (data.__errMsg && data.__errMsg !== '请先登录') {
          ctx.body = {
            code: -1,
            message: data.__errMsg
          }
        } else if (data.__errMsg === '请先登录') {
          ctx.body = {
            code: 1,
            message: data.__errMsg
          }
        } else {
          ctx.body = {
            code: 0,
            data: data
          }
        }
      }
    } catch (e) {
      ctx.body = {
        code: e.status || e.statusCode || (e.constructor === TypeError ? 400 : 500),
        message: e.message || e,
        stack: e.stack || e
      }
      if (!debug) {
        delete (ctx.body as any).stack
      }
    }
  }
}