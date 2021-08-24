import Header2 from "./test-header.component";
function RecruiterPage() {

    return (
        <div>
            <Header2 color='nav-links-white'/> 
        <div style={{"display": "flex", "padding-top": "100px","flex-direction": "row", "top": "15vw", 'flex-wrap': 'wrap', 'padding-bottom': '50px'}}>
            <div>
            <h1 style={{"width": "600px", "padding-top": "150px", "padding": "50px"}}>Meet the interns most passionate about your company’s work & mission.</h1>
            <h2 style={{"width": "600px", "padding-left": "50px"}}>We take the guessing out of the equation and funnel the right SWE & PM intern candidates straight to you.</h2>
            </div>
            
            <img style={{"align-self": "center"}} src="../../images/recruiting-graphic.png" width="300px" height="200px"/>
        </div>
        <div style={{"background": "#C9C3EB", "display": "flex", "flex-direction": "row", "top": "15vw", 'flex-wrap': 'wrap', 'justify-content': 'center'}}>
        <img style={{"align-self": "center", "padding": "50px"}} src="../../images/step1-r.png" width="300px" height="350px"/>
        <img style={{"align-self": "center", "padding": "50px"}} src="../../images/step2-r.png" width="300px" height="350px"/>
        <img style={{"align-self": "center", "padding": "50px"}} src="../../images/step3-r.png" width="300px" height="350px"/>
        </div>
        <div class="flex-grid">
            <div class="col">
                <h2>
                Discover who really wants to intern with you.
                </h2>
                <h3>
                We limit to how many clusters of companies students can apply to, so you don’t have to guess whether you’re their first choice.

                </h3>
            </div>
            <div class="col">
                <h2>
                Hire candidates excited about pursuing a future with your company.
                </h2>
                <h3>
                We route students to the sectors of tech they are most passionate about, so they’re more likely to come back full-time.
                </h3>
            </div>        
        </div>
        <div class="flex-grid">
            <div class="col">
                <h2>
                We’ve already found the top candidates.
                </h2>
                <h3>
                
                <ul>
                    <li>
                    Proficient coding & thinking skills
                    </li>
                    <li>
                    Invested in projects outside the classroom
                    </li>
                    <li>
                    Wanting to make impact in YOUR company’s field   
                    </li>
                </ul>
                </h3>
            </div>
            <div class="col">
                <h2>
                If it doesn’t work out, it’s on us.
                </h2>
                <h3>
                We’re so confident students are going to love you, we won’t charge you a penny unless they accept your offer.
                </h3>
            </div>

            </div>
        
        </div>
        
    )
}

export default RecruiterPage;