import Link from "next/link"

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <Link href='admin'>
        <button type="button" name="" id="" class="btn btn-primary">
          Admin
        </button>
      </Link>
      <Link href='/'>
        <button type="button" className="btn btn-primary">
          Regresar
        </button>
      </Link>
    </>
  )
}

export default Login