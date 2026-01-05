import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import ProfileCard from './components/ProfileCard'

function App() {
  // 1. ใช้ Lazy Initializer เช็คค่าจาก localStorage ทันทีที่สร้าง State
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    // ถ้าไม่มีใน storage ให้เช็คค่าเริ่มต้นจากระบบของเครื่อง (Windows/macOS Dark Mode)
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // 2. ใช้ useEffect ชุดเดียว เพื่อคอย "บันทึก" เมื่อค่า theme เปลี่ยน
  // วิธีนี้จะช่วยให้ข้อมูลใน localStorage และ attribute ในหน้าเว็บ อัปเดตตาม State เสมอ
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // ฟังก์ชันสลับธีม
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDark = theme === 'dark';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      minHeight: '100vh',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '800px', marginBottom: '20px' }}>
        <h1>My Team Portfolio</h1>
        <button 
          onClick={toggleTheme}
          style={{
            padding: '10px 20px',
            backgroundColor: isDark ? '#ffffff' : '#333333',
            color: isDark ? '#333333' : '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {/* ลองส่ง Props ข้อมูลของตัวเองลงไป */}
      <ProfileCard
        name="Prinnasit Jampa"
        role="Student @ CEDT"
        bio="play hard, study hard"
        theme={theme}
      />

      {/* ลองเรียกใช้ซ้ำอีกครั้งด้วยข้อมูลที่ต่างออกไป */}
      <ProfileCard
        name="John Doe"
        role="Guest Developer"
        bio="I love coding and learning "
        theme={theme}
      />
    </div>
  );
}

export default App;