const endpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

module.exports = (secretKey) => (req, res, next) => {
  req.turnstileValidate = async (token) => {
    return await fetch(endpoint, {
      method: 'POST',
      body: `secret=${encodeURIComponent(
        secretKey
      )}&response=${encodeURIComponent(token)}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
  }
  next()
}
