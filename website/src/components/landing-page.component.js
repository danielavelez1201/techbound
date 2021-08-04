import React from "react"
import Basics from "./basics.component";
import ClusterList from "./cluster-list.component";
import { useEffect, useState } from "react";
import { init } from "ityped"
import axios from "axios";
import { cardInfo } from "./cluster-list.component";
import Header2 from "./test-header.component";
import { connect, useSelector, useDispatch } from 'react-redux';
import { Waitlist } from 'waitlistapi';
import { setSourceMapRange } from "typescript";

function LandingPage({ isAuthenticated, user }) {
    const clusterTitles = cardInfo.map(cluster => cluster.title.toLowerCase())
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [allUsers, setAllUsers] = useState([])
    console.log(isAuthenticated, user);
    const [open, setOpen] = useState(false)

    const [collegesLoaded, setCollegesLoaded] = useState(false);
    const [colleges, setColleges] = useState(null);

    useEffect(async () => {
        const myElement = document.querySelector('#myElement')
        init(myElement, { showCursor: false, strings: clusterTitles, loop: true });
    }, [])    

    // useEffect(() => {
    //     async function getColleges() {
    //         await fetch('http://universities.hipolabs.com/search?country=United%20States')
    //             .then(res => res.json())
    //             .then(colleges => {
    //                 console.log(colleges); 
    //                 const collegeList = colleges.map(college => college.name)
    //                 console.log(collegeList)
    //                 setColleges(collegeList);    
    //                 setCollegesLoaded(true); 
    //                 return collegeList;      
    //             })
    //             .catch(error => console.error(error));
    //     };
    
    //     getColleges();
    // }, [collegesLoaded])



    return(
        <>
            <div className= 'blue-block landing-block black-text' onClick={() => setOpen(true)}>
                <div className= 'landing-grid'>
                    <img className = 'main-blob' alt='Big cluster' src='../../images/main-blob.png' />  
                    <img className = 'language-blob' alt='Language learning companies' src='../../images/language-blob.png' />  
                    <img className = 'gaming-blob' alt='Gaming companies' src='../../images/gaming-blob.png' /> 
                    <img className = 'productivity-blob' alt='Productivity companies' src='../../images/productivity-blob.png' />   
                </div>
            <Header2 color='nav-links-white' open={open}/> 
            <h1 className="black-text landing-text">Find a tech internship <br></br>
                        in <b>{" "}<span id="myElement"></span></b>|</h1>
                        <br>
                        </br>
                        <p className="landing-text subtitle p1"> Apply to mission-based clusters of companies and land your dream SWE or PM internship.</p>
            </div> 
                    <div className= 'content'>
                        
            </div>

            {/* <>
                <Waitlist api_key="W5L0VL" waitlist_link="http://techbound.io/"	/>
                    <style jsx>{`
                    h1 {
                        color: #361cd5;
                    }
                    .container--waitlistapi {
                        margin: 0 auto; // centers the widget
                        background-color: #ffffff;
                    }
                    .button--waitlistapi {
                        background-color: #3723db;
                    }
                    .statusTextContainer--waitlistapi {
                        color: #361cd5;
                    }
                    .referralLinkField--text {
                        color: #361cd5;
                    }
                    `}</style>
                </>
 */}
{/*             <div className= 'white-block black-text'>
                <div className= 'content'>
                    <h2>Explore Internships By Mission Cluster</h2>
                    <ClusterList />
                </div>
            </div> */}

            <div className='white-block'>
                <div className= 'content'>
                    <h2 className= 'center-text text-space black-text'>Stop sending hundreds of resumes into black holes of companies you're not excited about</h2>
                    <div class= 'image-rows'>
                        <img class= 'three-step' alt='1. Apply to the clusters that resonate with you most' src='../../images/step1.png' />
                        <img class= 'three-step' alt='2. Meet and network with company recruiters within the clusters' src='../../images/step2.png' />
                        <img class= 'three-step' alt='3. Interview with your top choices and get offers' src='../../images/step3.png' />
                    </div>
                </div>
            </div>

            <div className='white-block'>
                <div className= 'content'  style={{"display": "flex", "flex-wrap": "wrap"}}>
                    <h2 className= 'center-text black-text' >Create an account to get first priority for our first fall cohort.</h2>
                </div>
                <Basics props={colleges}/>
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
