import React from 'react'
import Link from "next/link"
const Sidebar = () => {
    const navigations = [
        {title: "Dashboard", route:"/"},
        {title:"Tasks", route:"/tasks"},
        {title: "Settings", route:"/settings"}
    ]
  return (
    <aside>
        <div>
            <h1>TaskForce</h1>
        </div>
        <ul>
            {
                navigations.map(nav=>{
                    return <li><Link href={nav.route}>{nav.title}</Link></li>
                })
            }
        </ul>
    </aside>
  )
}

export default Sidebar