import Civil from '../../util/db'

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case ('GET'):
      Civil
        .count({ where: { status: 1 } })
        .then(count => res.status(200).json(count))
        .catch(error => console.log(error))
      break
  }
}