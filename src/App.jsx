import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import ProfileCard from './components/ProfileCard'
function App() {
  const [githubData , setGitHubData] = useState(null);
  const username = "prinnasit";

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => {
        setGitHubData(data) })
      .catch(err => console.error(err));
  } , []);

  return (
    <div style={{ textAlign: 'center'}}>
      <h1>My First React App</h1>

      {/* { ลองส่ง Props ข้อมูลของตัวเองลงไป } */}
      {/* <ProfileCard
        name="Prinnasit Jampa"
        role="Student @ CEDT"
        bio="play hard, study hard"
      /> */}

      {/* ลองเรียกใช้ซ้ำอีกครั้งด้วยข้อมูลที่ต่างออกไป */}
      {/* <ProfileCard
        name="John Doe"
        role="Guest Developer"
        bio="I love coding and learning "
      /> */} 

      {githubData ? (
        <ProfileCard
          name={githubData.name || githubData.login}
          role="GitHub User"
          bio={githubData.bio || "No bio available."}
        />
      ) : (
        <p>Loading GitHub data...</p>
      )}
    </div>
  );
}

export default App;