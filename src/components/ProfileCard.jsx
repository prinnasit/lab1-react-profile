// src/components/ProfileCard.jsx
import { useState, useEffect } from 'react'

function ProfileCard({ name, role, bio, theme = 'light' }) {
  const [skills, setSkills] = useState(['React', 'Git'])
  const [input, setInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
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

  const deleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  // Task 1: Real-time filtering
  const filteredSkills = skills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        
        {/* Task 1: Search Filter */}
        <div style={{ marginBottom: '15px' }}>
          <input 
            type="text" 
            placeholder="Search skills..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              padding: '8px', 
              marginRight: '10px',
              backgroundColor: inputBgColor,
              color: textColor,
              border: `1px solid ${borderColor}`,
              borderRadius: '4px',
              width: '200px'
            }}
          />
        </div>

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
        
        {/* Task 1: Display List with Real-time Filtering */}
        <div style={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill, index) => {
              const skillIndex = skills.indexOf(skill)
              const isReact = skill === 'React'
              return (
                <span 
                  key={index} 
                  style={{ 
                    backgroundColor: isReact ? '#cc0000' : '#007bff',
                    color: 'white', 
                    padding: '5px 10px', 
                    borderRadius: '15px',
                    fontSize: '14px',
                    fontWeight: isReact ? 'bold' : 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                  title="Click X to delete"
                >
                  {skill}
                  {/* Task 2: Delete Button */}
                  <span 
                    onClick={() => deleteSkill(skillIndex)}
                    style={{
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      marginLeft: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '16px',
                      height: '16px',
                      lineHeight: '1',
                      userSelect: 'none'
                    }}
                  >
                    ✕
                  </span>
                </span>
              )
            })
          ) : (
            <p style={{ color: isDark ? '#aaaaaa' : '#666' }}>No skills found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;