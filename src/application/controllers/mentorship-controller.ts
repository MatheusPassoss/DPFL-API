import { IHttpContext } from "../../port/http/IHttpContext";
import { AcceptMentoringInvite } from "../../domain/core/use-cases/mentoring-cases/Invite/accept-mentoring-invite";
import { MentoringInvite } from "../../domain/core/entities/mentoring-invite";
import { IMentoringInviteRepository } from "../../domain/core/repositories/Mentoring/Invite/IMentoringInvite-repository";
import { RefuseMentoringInvite } from "../../domain/core/use-cases/mentoring-cases/Invite/refuse-mentoring-invite";
import { CreateMentoring } from "../../domain/core/use-cases/mentoring-cases/mentoring/create-mentoring";
import { Mentoring } from "../../domain/core/entities/metoring";
import { IStudentRepository } from "../../domain/core/repositories/User/IStudent-repository";
import { IMentorRepository } from "../../domain/core/repositories/User/IMentor-repository";
import { IMentoringRepository } from "../../domain/core/repositories/Mentoring/IMentoring-repository";
import { CancelMentoringInvite } from "../../domain/core/use-cases/mentoring-cases/Invite/cancel-mentoring-invite";
import { CreateMentoringInvite } from "../../domain/core/use-cases/mentoring-cases/Invite/create-metoring-invite";

export class MentorshipController  {
    
    private readonly mentoringRepository: IMentoringRepository;
    private readonly inviteRepository: IMentoringInviteRepository
    private readonly studentRepository: IStudentRepository;
    private readonly mentorRepository: IMentorRepository;

    constructor(mentoringRepo: IMentoringRepository, inviteRepo: IMentoringInviteRepository, studentRepo: IStudentRepository, mentorRepo: IMentorRepository ) {
        this.mentoringRepository = mentoringRepo;
        this.inviteRepository = inviteRepo
        this.studentRepository = studentRepo
        this.mentorRepository = mentorRepo
    } 
    
    async createInvite(http: IHttpContext ) {
        
        const res = http.getRequest()

        const params = {
            idMentor: res.body.idMentor,
            idStudent: res.body.idStudent,
            createAt: new Date()
        }

        const created = await new CreateMentoringInvite(this.inviteRepository, this.studentRepository, this.mentorRepository, this.mentoringRepository).execute(params)

        return created
    }
    
    async acceptInvite(http: IHttpContext ): Promise<Mentoring | null> {
     
        const res = http.getRequest()

        const AcceptInviteParams = {
            idMentoringInvite: res.body.idMentoringInvite,
            idStudent: res.body.idStudent,
            idMentor: res.body.idMentor,
        }

        const accepted = new AcceptMentoringInvite(this.inviteRepository).execute(AcceptInviteParams)

        if (!accepted) {
            return null
        }

        const createMentoringParams = {
            idStudent: res.body.idStudent,
            idMentor: res.body.idMentor,
            date: new Date()
        }

        const created = await new CreateMentoring(this.mentoringRepository, this.inviteRepository, this.studentRepository, this.mentorRepository).execute(createMentoringParams)

        return created
    }

    async acceptInviteByEmailNotification(http: IHttpContext) {

        const res = http.getRequest()
        const { id, idStudent, idMentor} = res.query

        const AcceptInviteParams = {
            idMentoringInvite: id,
            idStudent,
            idMentor,
        }

        const accepted = await new AcceptMentoringInvite(this.inviteRepository).execute(AcceptInviteParams)

        if (!accepted) {
            return null
        }

        const createMentoringParams = {
            idStudent,
            idMentor,
            date: new Date()
        }

        const created = await new CreateMentoring(this.mentoringRepository, this.inviteRepository, this.studentRepository, this.mentorRepository).execute(createMentoringParams)

        return created
    }

    async refuseInviteByEmailNotification(http: IHttpContext) {
        
        const res = http.getRequest()
        const { id, idStudent, idMentor} = res.query

        const refuseInviteParams = {
            idMentoringInvite: id,
            idStudent,
            idMentor,
        }

        const refused = await new RefuseMentoringInvite(this.inviteRepository).execute(refuseInviteParams)
    
        return refused
    }

    async listStudentInvitesById(http: IHttpContext): Promise<MentoringInvite[]>  {
         
         const res = http.getRequest()
         
         const { idStudent } = res.query
         const invites = await this.inviteRepository.listByStudentId(idStudent)
 
         if (!invites) {
            return []
         }

         return invites
 
    }

    async refuseInvite(http: IHttpContext ) {
        
        const res = http.getRequest()

        const params = {
            idMentoringInvite: res.body.idMentoringInvite,
            idStudent: res.body.idStudent,
            idMentor: res.body.idMentor,
        }

        const refused = await new RefuseMentoringInvite(this.inviteRepository).execute(params)

        return refused
    }

    async cancelInvite(http: IHttpContext ) {
        
        const res = http.getRequest()
        
        const params = {
            id: res.body.idMentoringInvite,
            idStudent: res.body.idStudent,
            idMentor: res.body.idMentor,
        }

        const canceled = await new CancelMentoringInvite(this.inviteRepository, this.studentRepository, this.mentorRepository).execute(params)
    
        return canceled
    }
   
}