import Link from "next/link"
const Admin = () => {
  return (
    <>
      <h1>Admin</h1>
      <Link href='/'>
        <button type="button" className="btn btn-primary">
          Regresar
        </button>
      </Link>
    </>
  )
}

export default Admin