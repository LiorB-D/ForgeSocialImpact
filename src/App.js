import './App.css';
import React, {useState, useEffect} from 'react';



const url = "https://api.propublica.org/congress/v1/116/house/members.json"
const apiKey = "4ll6jGJJSLaZrafzsIuVFmaNrmcrQFlgyQzcy3Yi"

function App() {
  const [members, setMembers] = useState([])
  
    const fetchMembers = async () => {
      let resp = fetch(url, {
        headers: {
          'X-API-Key': apiKey
        }
      }).then(response => response.json()).then(data => {
        setMembers(data.results[0].members)
        console.log(members)

      })
    }  
    useEffect(() => {
      fetchMembers()
    }, [])

  

  return (
    <div className="App">
      <h1>Senators</h1>
      {members.map(m => (
          <p>{m.last_name}</p>
        ))}
    </div>
  );
}

export default App;
