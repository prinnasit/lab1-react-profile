import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import ProfileCard from './components/ProfileCard'
function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>My Team Portfolio</h1>

      {/* ลองส่ง Props ข้อมูลของตัวเองลงไป */}
      <ProfileCard
        name="Prinnasit Jampa"
        role="Student @ CEDT"
        bio="play hard, study hard"
      />

      {/* ลองเรียกใช้ซ้ำอีกครั้งด้วยข้อมูลที่ต่างออกไป */}
      <ProfileCard
        name="John Doe"
        role="Guest Developer"
        bio="I love coding and learning "
      />
    </div>
  );
}

export default App;