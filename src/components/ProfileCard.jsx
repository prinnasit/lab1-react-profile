// src/components/ProfileCard.jsx
import { useState, useEffect } from 'react'

function ProfileCard({ name, role, bio, theme = 'light' }) {
  const [skills, setSkills] = useState(['React', 'Git'])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState(null)

  const isDark = theme === 'dark'
  const bgColor = isDark ? '#2a2a2a' : '#ffffff'
  const textColor = isDark ? '#ffffff' : '#000000'
  const borderColor = isDark ? '#444444' : '#ccc'
  const inputBgColor = isDark ? '#333333' : '#ffffff'

  useEffect(() => {
    // Fetch user data from GitHub API
    const fetchUserData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`https://api.github.com/users/${name.toLowerCase().split(' ')[0]}`)
        
        if (response.status === 404) {
          setError(`❌ User not found`)
          setUserData(null)
        } else if (!response.ok) {
          throw new Error('Failed to fetch user data')
        } else {
          const data = await response.json()
          setUserData(data)
          setError(null)
        }
      } catch (err) {
        setError(err.message)
        setUserData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [name])

  const addSkill = () => {
    if (input.trim() !== '') {
      setSkills([...skills, input])
      setInput('')
    }
  }

  // Skeleton Screen while loading
  if (loading) {
    return (
      <div style={{ 
        border: `1px solid ${borderColor}`, 
        padding: '20px', 
        borderRadius: '10px', 
        marginBottom: '20px', 
        backgroundColor: isDark ? '#333333' : '#f5f5f5',
        color: textColor
      }}>
        <div style={{ height: '24px', backgroundColor: isDark ? '#444444' : '#e0e0e0', borderRadius: '4px', marginBottom: '15px', width: '60%' }}></div>
        <div style={{ height: '16px', backgroundColor: isDark ? '#444444' : '#e0e0e0', borderRadius: '4px', marginBottom: '10px', width: '40%' }}></div>
        <div style={{ height: '16px', backgroundColor: isDark ? '#444444' : '#e0e0e0', borderRadius: '4px', marginBottom: '15px', width: '70%' }}></div>
        <p style={{ color: isDark ? '#aaaaaa' : '#666', fontSize: '14px' }}>Loading...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div style={{ 
        border: '2px solid #dc3545', 
        padding: '20px', 
        borderRadius: '10px', 
        marginBottom: '20px', 
        backgroundColor: isDark ? '#3d2a2a' : '#fff5f5',
        color: '#dc3545'
      }}>
        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{error}</p>
      </div>
    )
  }

  return (
    <div style={{ 
      border: `1px solid ${borderColor}`, 
      padding: '20px', 
      borderRadius: '10px', 
      marginBottom: '20px',
      backgroundColor: bgColor,
      color: textColor,
      transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
    }}>
      <h2>{name}</h2>
      <p><strong>Role:</strong> {role}</p>
      <p>{bio}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Skills</h3>
        <input 
          type="text" 
          placeholder="Add Skill" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          style={{ 
            padding: '8px', 
            marginRight: '10px',
            backgroundColor: inputBgColor,
            color: textColor,
            border: `1px solid ${borderColor}`,
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={addSkill} 
          style={{ 
            padding: '8px 15px', 
            cursor: 'pointer',
            backgroundColor: isDark ? '#555555' : '#e0e0e0',
            color: textColor,
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Add
        </button>
        
        <div style={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {skills.map((skill, index) => (
            <span key={index} style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              padding: '5px 10px', 
              borderRadius: '15px',
              fontSize: '14px'
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;