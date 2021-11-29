import axios from 'axios';

const COMPETITION_REST_API_URL = "http://localhost:8080/api/competition";
const COMPETITION_CREATE_REST_API_URL = "http://localhost:8080/api/competition/create";
const COMPETITION_ADD_REFEREE_REST_API_URL = "http://localhost:8080/api/competition/add_referee";

class CompetitionService {
    getAllCompetitions = (token) => {
        return axios.get(COMPETITION_REST_API_URL,
            { headers: { Authorization: 'Bearer '+token}}).catch(error => {
            alert(error.message);
            console.error('There was an error!', error);
        });
    }

    postNewCompetitions = (token, competition) => {
        if(!(competition.type === "TEAM" || competition.type === "INDIVIDUAL"))
            alert("wrong type parameter");
        return axios.post(COMPETITION_CREATE_REST_API_URL, {
            competitorLimit: competition.competitorLimit,
            startDate: competition.startDate.toISOString(),
            type: competition.type,
            stages: competition.stages
            },
            { headers: { Authorization: 'Bearer '+token}}).catch(error => {
            alert(error.message);
            console.error('There was an error!', error);
        });
    }
}

const NewCompetitionService = new CompetitionService();
export default NewCompetitionService;