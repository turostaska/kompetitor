import axios from 'axios';

const COMPETITION_REST_API_URL = "http://localhost:8080/api/competition";

const COMPETITIONS_REFEREED_BY_API_URL = "http://localhost:8080/api/competition/refereed_by";

class CompetitionService {
    getAllCompetitions = (token) => {
        return axios.get(COMPETITION_REST_API_URL, {
            headers: {Authorization: `Bearer ${token}`}
        }).catch(error => {
            alert(error.message);
            console.error(error.request)
        });
    }

    getCompetitionsRefereedBy = (token) => {
        return axios.get(COMPETITIONS_REFEREED_BY_API_URL, {
            headers: {Authorization: `Bearer ${token}`}
        }).catch(error => {
            alert(error.message);
            console.error(error.request)
        });
    }
}

const competitionService = new CompetitionService();
export default competitionService;