import axios from 'axios'

const CURRENT_STAGE_CONCLUDED_API_URL = "http://localhost:8080/api/competition/{competitionId}/current_stage_concluded"
const ADVANCE_STAGE_API_URL = "http://localhost:8080/api/competition/{competitionId}/advance"
const GET_COMPETITION_API_URL = "http://localhost:8080/api/competition/{competitionId}"
const UPDATE_MATCH_API_URL = "http://localhost:8080/api/referee/update"

const currentStageConcludedUrl = competition => CURRENT_STAGE_CONCLUDED_API_URL.replace("{competitionId}", competition.id)

const advanceStageConcludedUrl = competition => ADVANCE_STAGE_API_URL.replace("{competitionId}", competition.id)

const getCompetitionUrl = competition => GET_COMPETITION_API_URL.replace("{competitionId}", competition.id)

class RefereeService {
    currentStageConcluded = (competition, token) => {
        return axios.get(currentStageConcludedUrl(competition), {
            headers: {Authorization: `Bearer ${token}`}
        }).catch(error => {
            alert(error.message);
            console.error(error.request)
        });
    }

    advanceToNextStage = (competition, token) => {
        return axios.get(advanceStageConcludedUrl(competition), {
            headers: {Authorization: `Bearer ${token}`}
        }).catch(error => {
            alert(error.message);
            console.error(error.request)
        });
    }

    getCompetition = (competition, token) => {
        return axios.get(getCompetitionUrl(competition), {
            headers: {Authorization: `Bearer ${token}`}
        }).catch(error => {
            alert(error.message);
            console.error(error.request)
        });
    }

    updateMatch = (match, token) => {
        return axios.post(UPDATE_MATCH_API_URL, {
            id: match.id,
            scores: match.scores,
            concluded: match.concluded,
        }, {
            headers: {Authorization: `Bearer ${token}`}
        }).catch(error => {
            alert(error.message);
            console.error(error.request)
        });
    }
}

const refereeService = new RefereeService()
export default refereeService