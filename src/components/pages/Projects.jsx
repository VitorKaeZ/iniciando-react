import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import styles from './Projects.module.css'

import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import Loading from '../layout/Loading'
import Message from "../layout/Message"
import ProjectCard from '../project/ProjectCard'

function Projects(){

    const [ projects, SetProjects ] = useState([])
    const [removeLoading, setRemoveLoading ] = useState(false)

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(
            () => {

                fetch('https://react-json-server0.herokuapp.com/api/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            }).then(resp => resp.json())
            .then(data => {
                console.log(data)
                SetProjects(data)
                setRemoveLoading(true)
            }).catch((err) => console.log(err))
        },300)   
    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Message msg={message} type="success" />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard 
                            id={project.id}
                            name={project.name} 
                            budget={project.budget} 
                            category={project.category.name} 
                            key={project.id}                        
                        />
                    ))}
                    { !removeLoading && <Loading/> }
                    { removeLoading && projects.length === 0 && (
                        <p>N??o h?? projetos cadastrados!</p>
                    ) }
            </Container>
        </div>
    )
}

export default Projects