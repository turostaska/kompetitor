import axios from 'axios';

const COMPETITION_REST_API_URL = "http://localhost:8080/api/competition";

const getResultsUrl = (competition) => "http://localhost:8080/api/competition/{competitionId}/results"
    .replace("{competitionId}", competition.id)

const getCssUrl = (competition) => "http://localhost:8080/api/competition/{competitionId}/css"
    .replace("{competitionId}", competition.id)

class CompetitionService {
    getAllCompetitions = (token) => {
        return axios.get(COMPETITION_REST_API_URL, {
            headers: {Authorization: `Bearer ${token}`}
        }).catch(error => {
            alert(error.message);
            console.error(error.request)
        });
    }

    getResultsFor = (competition, token) => {
        return axios.get(getResultsUrl(competition), {
            headers: {Authorization: `Bearer ${token}`}
        }).catch(error => {
            alert(error.message);
            console.error(error.request)
        });
    }

    getCssForCompetition = (competition, token) => {
        return axios.get(getCssUrl(competition), {
            headers: {Authorization: `Bearer ${token}`}
        }).catch(error => {
            console.error(error.request)
        });
    }
}

const competitionService = new CompetitionService();
export default competitionService;