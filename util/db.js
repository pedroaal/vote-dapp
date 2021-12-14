const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('aes_db', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: './db.sqlite3'
});

const CivilModel = require('../models/ci')
// import { CivilModel, createPersons } from '../models/ci'
const Civil = CivilModel(sequelize, DataTypes)

const createCis = async () => {
  let persons = [
    {
      ci: '1719953281',
      fingerprint: '123456',
      name: 'Pedro',
      last_name: 'Altamirano',
      status: 1,
    },
    {
      ci: '1719953282',
      fingerprint: '123457',
      name: 'Persona',
      last_name: '2',
      status: 1,
    },
    {
      ci: '1719953283',
      fingerprint: '123458',
      name: 'Persona',
      last_name: '3',
      status: 1,
    },
    {
      ci: '1719953284',
      fingerprint: '123459',
      name: 'Persona',
      last_name: '4',
      status: 0,
    },
  ]

  persons.map(person => {
    Civil.create({
      ci: person.ci,
      fingerprint: person.fingerprint,
      name: person.name,
      last_name: person.last_name,
      status: person.status
    });
  })

  return persons
}

(async () => {
  await sequelize.sync();
  let persons = await Civil.findAll()
  if (persons.length <= 0) persons = createCis()
})();

export default Civil