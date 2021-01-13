import React from 'react';
import ClusterList from "./cluster-list.component";

function LandingPage() {
    return(
        <>
            <div className= 'blue-block landing-block black-text'>
                    <div className= 'content'>
                        <h1 className="black-text landing-text">Find a tech internship <br></br>
                        in <b>gaming</b>|</h1>
                        <p className="black-text landing-text">Start growing your career in tech by looking in the <br></br>
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
                    <h2 className= 'center-text'>TechBound can help you customize your resume to company mission.</h2>
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
                </div>
            </div>
        </>
    )
}

export default LandingPage;