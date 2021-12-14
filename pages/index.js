import Head from 'next/head';
import React, { useState, useEffect } from 'react';

import { init, vote, getWinner, getStats } from '../util/getWeb3';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { ToastContainer, toast } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend);

const dataset = {
  label: '# de Votos',
  data: [],
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ],
  borderColor: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ],
  borderWidth: 1,
};

export async function getStaticProps(context) {
  const baseURL = 'http://localhost:3000'
  const res = await fetch(`${baseURL}/api/count`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      total_votantes: data
    },
  }
}

const Home = ({ total_votantes }) => {
  const [state, setState] = useState({ proposal: '', ci: '', fingerprint: '' })
  const [winner, setWinner] = useState('')
  const [stats, setStats] = useState()
  const [totalVotes, setTotalVotes] = useState(0)

  const getStatsF = () => {
    getStats()
      .then(tx => {
        const labels = tx.map(vote => vote[0])
        const data = tx.map(vote => Number(vote[1]))
        const datasets = [{
          ...dataset,
          data
        }]
        const statsData = {
          labels,
          datasets
        }
        setStats(statsData)

        const total = data.reduce((acc, item) => acc + item)
        setTotalVotes(total)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    init()
    getStatsF()
    setInterval(() => {
      getStatsF()
    }, (120 * 1000)); // sec * millsecs
  }, [])

  const giveVote = async () => {
    const res = await fetch('/api/ci', {
      method: 'POST',
      body: JSON.stringify(state)
    })
    const access = await res.json()
    if (access) {
      vote(state)
        .then(tx => {
          toast.success('Voto gerado')
        })
        .catch(err => {
          console.log(err)
          toast.error(err)
        })
    } else {
      toast.error('Datos no encontrados')
    }
  };

  const getWinnerF = () => {
    getWinner()
      .then(tx => {
        setWinner(tx)
      })
      .catch(err => console.log(err))
  };

  const handleSelect = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className='container'>
      <Head>
        <title>Vote Decentralized App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />

      {
        stats &&
        <Doughnut
          data={stats}
        />
      }
      {
        totalVotes && total_votantes &&
        <div className="progress my-2" style={{ height: 30 }}>
          <div className="progress-bar" role="progressbar" aria-valuenow={totalVotes} aria-valuemin="0" aria-valuemax={total_votantes}>Votos</div>
        </div>
      }
      {
        winner &&
        <p className='my-2'>Actual winner: {winner}</p>
      }
      <div className="form-group my-2">
        <label htmlFor="proposal">Candidatos</label>
        <select className="form-control" name="proposal" id="proposal" onChange={handleSelect}>
          <option value=''>Selecciona uno...</option>
          <option value='0'>Candidato 1</option>
          <option value='1'>Candidato 2</option>
          <option value='2'>Candidato 3</option>
        </select>
      </div>

      <div className="form-group my-2">
        <label htmlFor="ci">CI</label>
        <input type="text" className="form-control" name="ci" id="ci" onChange={handleSelect} />
      </div>

      <div className="form-group my-2">
        <label htmlFor="fingerprint">Huella id</label>
        <input type="text" className="form-control" name="fingerprint" id="fingerprint" onChange={handleSelect} />
      </div>

      <div className='d-flex justify-content-between my-2'>
        <button type="button" name="vote" id="vote" className="btn btn-primary" onClick={giveVote}>Votar</button>
        <button type="button" name="vote" id="vote" className="btn btn-primary" onClick={getWinnerF}>get winner</button>
        <button type="button" name="vote" id="vote" className="btn btn-primary" onClick={getStatsF}>get stats</button>
      </div>

    </div>
  )
}

export default Home