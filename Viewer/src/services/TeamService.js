import axios from 'axios';

const TEAM_CREATE_REST_API_URL = "http://localhost:8080/api/team/create";
const TEAM_LEAVE_REST_API_URL = "http://localhost:8080/api/team/leave";
const TEAM_ALL_REST_API_URL = "http://localhost:8080/api/team/";

class TeamService
{
    postCreate = (token, team) => {
        return axios.post(TEAM_CREATE_REST_API_URL, {
                name: team.name,
            },
            { headers: { Authorization: 'Bearer '+token}}).catch(error => {
            alert(error.message);
            console.error('There was an error!', error);
        });
    }
    getMyTeam = (token) => {
        return axios.get(TEAM_ALL_REST_API_URL,
            { headers: { Authorization: 'Bearer '+token}}).catch(error => {
            alert(error.message);
            console.error('There was an error!', error);
        });
    }

    getLeave = (token) => {
        return axios.get(TEAM_LEAVE_REST_API_URL,
            { headers: { Authorization: 'Bearer '+token}}).catch(error => {
            alert(error.message);
            console.error('There was an error!', error);
        });
    }
}
const NewTeamService = new TeamService();
export default NewTeamService;