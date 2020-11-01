import './App.css';
import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const url = "https://api.propublica.org/congress/v1/116/senate/members.json"
const apiKey = "4ll6jGJJSLaZrafzsIuVFmaNrmcrQFlgyQzcy3Yi"

function App() {
  const [members, setMembers] = useState([])
  const [valMembers, setValMembers] = useState([])
  const [searchStr, setSearchStr] = useState("")
  

    const fetchMembers = async () => {
      let resp = fetch(url, {
        headers: {
          'X-API-Key': apiKey
        }
      }).then(response => response.json()).then(data => {
        setMembers(data.results[0].members)
        console.log(data)

      })
    }  

    const updateSearch = (e) => {
      setSearchStr(e.target.value)

      let str = e.target.value.toLowerCase()
      let membs = []
      members.map((m) => {
          if(m.first_name.toLowerCase().includes(str) || m.last_name.toLowerCase().includes(str) || m.state.toLowerCase().includes(str)) {
            membs.push(m)
          }
      })
      setValMembers(membs)

    }

    useEffect(() => {
      fetchMembers()
    }, [])
    
    const MemberBox = (member) => {
      return <div class = {"MemberBox" + member.member.party}>
        <h3>{member.member.first_name} {member.member.last_name}</h3>
        <h4>{member.member.party}-{member.member.state}</h4>
        <p>{member.member.url}</p>
        </div>
    }
  

  return (
    <div className="App">
      <h1>Search Senators by Name or State Abbrev.</h1>
      <TextField label = "Search Senators" value = {searchStr} onChange = {updateSearch}/>

        <Grid container justify="center" spacing={3}>
        {valMembers.map(m => (
          <Grid item>
            <MemberBox member = {m}/>
          </Grid>
        ))}
        </Grid>
    </div>
  );
}

export default App;
