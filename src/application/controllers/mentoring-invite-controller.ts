import { IHttpContext } from "../../port/http/IHttpContext";
import { IHttpRequest } from "../../port/http/IHttpRequest";
import { IHttpResponse } from "../../port/http/IHttpResponse";
import { AcceptMentoringInvite } from "../../domain/core/use-cases/mentoring-cases/Invite/accept-mentoring-invite";
import { InMemoryMentoringInviteRepository } from "../../../tests/repositories/in-memory-mentoring-invite-repository";

export class MentoringInviteController  {
    

    async acceptInvite(http: IHttpContext ) {

        const res = http.getRequest()
        const InviteRepository = new InMemoryMentoringInviteRepository
        const accept = new AcceptMentoringInvite(InviteRepository)

        const params = {
            idMentoringInvite: res.body.idMentoringInvite,
            idStudent: res.body.idStudent,
            idMentor: res.body.idStudent,
        }

        const accepted = await accept.execute(params)

        return accepted
    }

    refuseInvite(req: IHttpRequest, res: IHttpResponse) {

    }

    cancelInvite(req: IHttpRequest, res: IHttpResponse) {

    }

    createInvite(req: IHttpRequest, res: IHttpResponse) {

    }

    getInviteByStudentId(req: IHttpRequest, res: IHttpResponse) {

    }

    getAllInviteByStudent(req: IHttpRequest, res: IHttpResponse) {

    }

    getInvitesByStatus(req: IHttpRequest, res: IHttpResponse) {

    }

    getAllInvitesByStatus(req: IHttpRequest, res: IHttpResponse) {

    }


   
}