import { useState, useEffect } from 'react'
import {
  overlay,
  projectsContainer,
  projectContainer,
  text,
} from './projects.module.css'
import axios from 'axios'
import SectionTitle from '../SectionTitle/SectionTitle'
import ReactHTMLParser from 'react-html-parser'

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function fetchProjects() {
      await axios
        .get('https://jacques-portfolio-api.herokuapp.com/api/projects')
        .then((res) => setProjects(res.data.data))
        .catch((err) => console.log(err))
      return
    }

    fetchProjects()
  }, [])

  return (
    <div className='container' id='projects'>
      <SectionTitle title='My projects' />

      <div className={`${projectsContainer} w-100 align-items-center`}>
        {projects.length > 0 &&
          projects.map((project) => (
            <div
              key={project.name}
              className={`${projectContainer} w-100 d-flex flex-column`}
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div
                className={`${overlay} d-flex flex-column justify-content-center align-items-center text-center p-5`}
              >
                <h4 className={text}>{project.name}</h4>
                <h6 className={text}>{project.short_description}</h6>
                <p className={text}>
                  {ReactHTMLParser(project.long_description)}
                </p>
                <div className='d-flex w-100 justify-content-evenly'>
                  <a
                    href={project.live_url}
                    target='_blank'
                    rel='noreferrer'
                    className='btn btn-dark'
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.repository_url}
                    target='_blank'
                    rel='noreferrer'
                    className='btn btn-dark'
                  >
                    Repository
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Projects