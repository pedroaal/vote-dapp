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
      full_name: 'Pedro Altamirano',
    },
    {
      ci: '1719953282',
      fingerprint: '123457',
      full_name: 'Persona 2',
    },
    {
      ci: '1719953283',
      fingerprint: '123458',
      full_name: 'Persona 3',
    },
  ]

  persons.map(person => {
    Civil.create({
      ci: person.ci,
      fingerprint: person.fingerprint,
      full_name: person.full_name,
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