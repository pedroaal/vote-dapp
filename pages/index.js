import Link from "next/link"

const Home = () => {
  return (
    <div className="container h-100 d-flex flex-column justify-content-evenly">
      <h1 className="my-3">Bienvenido al sistema de votaciones</h1>
      <Link href='/dapp'>
        <button type="button" className="btn btn-primary btn-lg btn-block my-3">
          Soy votante
        </button>
      </Link>
      <Link href='/login'>
        <button type="button" class="btn btn-primary btn-lg btn-block my-3">
          Soy administrador
        </button>
      </Link>
    </div>
  )
}

export default Home