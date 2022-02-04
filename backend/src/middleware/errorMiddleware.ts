
const errorHandler = (error: any, req: any, res: any, next: any) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : res.stack,
    })

}

const notFound = (req: any, res: any, next: any) => {
    const err = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(err)
}

export {notFound, errorHandler}