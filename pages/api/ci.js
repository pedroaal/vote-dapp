import Civil from '../../util/db'

const validateCi = ci => {
  return false
}

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case ('GET'):
      Civil
        .findAll()
        .then(all => res.status(200).json(all))
        .catch(error => console.log(error))
      break
    case ('POST'):
      const { ci, fingerprint } = JSON.parse(req.body)
      const person = await Civil.findOne({ where: { ci, fingerprint, state: 1 } })
      const valid = person ? true : false
      res.status(200).send(valid)
      break
  }
}