import Civil from '../../util/db'
import validateCi from '../../util/validateCi'

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
      // if (!validateCi(ci.toString())) {
      //   res.status(404).json({ error: 'CI con fallo' })
      //   break
      // }
      const person = await Civil.findOne({ where: { ci, fingerprint, status: 1 } })
      const valid = person ? true : false
      res.status(200).json({ status: valid })
      break
  }
}