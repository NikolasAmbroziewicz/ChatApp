import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'


const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body, req.query, req.params)
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    })
    next()
  } catch(e: any) {
    return res.status(400).send(e.error)
  }
}

export default validate