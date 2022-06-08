import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

const Head = ({title}:{title:string}) => <h1>{title}</h1>
function App() {

  return (
   <div><Head title={'dsa'}/></div>
  )
}

export default App
