import { withSentry } from '@sentry/nextjs'

const handler = (req, res) => {
  res.status(200).json({})
}

export default withSentry(handler)
