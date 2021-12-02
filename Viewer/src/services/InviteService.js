import axios from 'axios';

const INVITE_ACCEPT_REST_API_URL = "http://localhost:8080/api/team/invitations/accept";
const INVITE_SEND_REST_API_URL = "http://localhost:8080/api/team/invitations/send";
const INVITE_ALL_REST_API_URL = "http://localhost:8080/api/team/invitations/";

class InviteService
{
    postAcceptInvite = (token, invite) => {
        return axios.post(INVITE_ACCEPT_REST_API_URL, {
                invitationId: invite.id
            },
            { headers: { Authorization: 'Bearer '+token}}).catch(error => {
            alert(error.message);
            console.error('There was an error!', error);
        });
    }
    getMyInvites = (token) => {
        return axios.get(INVITE_ALL_REST_API_URL,
            { headers: { Authorization: 'Bearer '+token}}).catch(error => {
            alert(error.message);
            console.error('There was an error!', error);
        });
    }
    postSendInvite = (token, receiver) => {
        return axios.post(INVITE_SEND_REST_API_URL, {
                receiverName: receiver.username
            },
            { headers: { Authorization: 'Bearer '+token}}).catch(error => {
            alert(error.message);
            console.error('There was an error!', error);
        });
    }
}
const NewInviteService = new InviteService();
export default NewInviteService;