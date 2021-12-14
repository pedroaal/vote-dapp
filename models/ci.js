// const CivilModel = (sequelize, type) => {
//   return sequelize.define('civil', {
//     ci: type.STRING,
//     fingerprint: type.STRING,
//     full_name: type.STRING
//   })
// }

// const createPersons = async (Civil) => {
//   let persons = [
//     {
//       ci: '1719953281',
//       fingerprint: '123456',
//       full_name: 'Pedro Altamirano',
//     },
//     {
//       ci: '1719953282',
//       fingerprint: '123457',
//       full_name: 'Persona 2',
//     },
//     {
//       ci: '1719953283',
//       fingerprint: '123458',
//       full_name: 'Persona 3',
//     },
//   ]

//   persons.map(person => {
//     Civil.create({
//       ci: person.ci,
//       fingerprint: person.fingerprint,
//       full_name: person.full_name,
//     });
//   })

//   return persons
// }

module.exports = (sequelize, type) => {
  return sequelize.define('civil', {
    ci: type.STRING,
    fingerprint: type.STRING,
    name: type.STRING,
    last_name: type.STRING,
    status: {
      type: type.BOOLEAN,
      default: 1
    }
  })
}
// export { CivilModel, createPersons }