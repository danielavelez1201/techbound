import React from "react"
import Basics from "./basics.component";
import ClusterList from "./cluster-list.component";
import { useEffect, useState } from "react";
import { init } from "ityped"
import axios from "axios";
import { cardInfo } from "./cluster-list.component";
import Header2 from "./test-header.component";
import { connect, useSelector, useDispatch } from 'react-redux';

function LandingPage({ isAuthenticated, user }) {
    const clusterTitles = cardInfo.map(cluster => cluster.title.toLowerCase())
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [allUsers, setAllUsers] = useState([])
    console.log(isAuthenticated, user);
    useEffect(async () => {
        const myElement = document.querySelector('#myElement')
        init(myElement, { showCursor: false, strings: clusterTitles, loop: true });

        const allUsers = await axios('http://localhost:5000/users/')
        setAllUsers(allUsers.data)
    }, [])    

    const userData = useSelector(user => user.auth.user);
    console.log(userData);
    console.log(allUsers)

    
    return(
        <>
            <div className= 'blue-block landing-block black-text'>
                <div className= 'landing-grid'>
                    <img className = 'main-blob' alt='Big cluster' src='../../images/main-blob.png' />  
                    <img className = 'language-blob' alt='Language learning companies' src='../../images/language-blob.png' />  
                    <img className = 'gaming-blob' alt='Gaming companies' src='../../images/gaming-blob.png' /> 
                    <img className = 'productivity-blob' alt='Productivity companies' src='../../images/productivity-blob.png' />   
                </div>

            <Header2 />  
                    <div className= 'content'>
                        <ul>
                            {allUsers.map(item=> (
                                <li key={item._id}>
                                    <p>{item.firstname}</p>
                                </li>
                            ))}
                        </ul>
                        <h1 className="black-text landing-text">Find a tech internship <br></br>
                        in <b>{" "}<span id="myElement"></span></b>|</h1>
                        <p className="landing-text p1"> Start growing your career in tech by looking in the <br></br>
                        areas you’re most passionate about.</p>
                    </div>
            </div>

            <div className= 'white-block black-text'>
                <div className= 'content'>
                    <h2>Explore Internships By Mission Cluster</h2>
                    <ClusterList />
                </div>
            </div>

            <div className='blue-block'>
                <div className= 'content'>
                    <h2 className= 'center-text white-text text-space'>TechBound can help you customize your resume to company mission.</h2>
                    <div class= 'image-rows'>
                        <img class= 'three-step' alt='1. Choose the missions that resonate with you most' src='../../images/step1.png' />
                        <img class= 'three-step' alt='2. Share your resume and other work experiences' src='../../images/step2.png' />
                        <img class= 'three-step' alt='3. Learn what to highlight for every mission cluster' src='../../images/step3.png' />
                    </div>
                </div>
            </div>

            <div className='white-block'>
                <div className= 'content'>
                    <h2>Let us look at your resume and help you tailor it to your dream clusters.</h2>
                    <Basics />
                </div>
            </div>
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps)(LandingPage);
