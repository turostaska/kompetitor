import axios from 'axios';
import StageViewDTO from "../DTOs/StageViewDTO";

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

    postNewReferee = (token, competitionId, referee) => {
        return axios.post(COMPETITION_ADD_REFEREE_REST_API_URL, {
                refereeName: referee,
                competitionId: Number(competitionId)
            },
            { headers: { Authorization: 'Bearer '+token}}).catch(error => {
            alert(error.message);
            console.error('There was an error!', error);
        });
    }

    postNewCompetitions = (token, competition) => {
        if(!(competition.type === "TEAM" || competition.type === "INDIVIDUAL"))
            alert("wrong type parameter");
        let stageList = [];
        for(let i =0; i<competition.stages.length;i++){
            let help = new StageViewDTO(competition.stages[i].type, Number(competition.stages[i].numCompetitorsIn), Number(competition.stages[i].numCompetitorsOut),
                Number(competition.stages[i].numCompetitorsPerMatch), Number(competition.stages[i].numLegs), Number(competition.stages[i].numTeamsPerGroup),
                Number(competition.stages[i].pointsForWin), Number(competition.stages[i].pointsForTie), Number(competition.stages[i].pointsForLoss));
            stageList.push(help.getStage());
        }
        competition.stages=stageList;
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