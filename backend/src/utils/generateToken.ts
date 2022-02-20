import jwt from 'jsonwebtoken'

export const generateToken = (user_id: any) => {
  return jwt.sign({
    user_id
  }, process.env.TOKEN_SECRET!,
  { expiresIn: '30d' })
}
