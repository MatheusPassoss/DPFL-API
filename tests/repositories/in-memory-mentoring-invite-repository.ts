import { MentoringInvite } from "../../src/domain/core/entities/mentoring-invite";
import { EntityNotFound } from "../../src/domain/core/exceptions/entity-not-found";
import { InvalidDataError } from "../../src/domain/core/exceptions/invalid-data-error";
import { InvalidInviteStatusError } from "../../src/domain/core/exceptions/invalid-invite-status-error";
import { IMentoringInviteRepository } from "../../src/domain/core/repositories/Mentoring/Invite/IMentoringInvite-repository";


export class InMemoryMentoringInviteRepository implements IMentoringInviteRepository {


    public MentoringInvites: MentoringInvite[] = [

        {
            id: 'e4eff12e-fd8c-44b4-9f0a-f684cc42e953',
            idStudent: '21ed35ad-2671-473f-9a0b-206771a0a786',
            idMentor: '89852778-6118-428c-8e49-138e71643faf',
            status: "ACCEPTED",
            createAt: new Date(),
            updateAt: new Date(),
            acceptInvite: function (): void {
                if (this.status != "PEDDING") {
                    throw new InvalidInviteStatusError(this.status);
                }

                this.status = "ACCEPTED";
            },
            refuseInvite: function (): void {
                if (this.status !== "PEDDING") {
                    throw new InvalidInviteStatusError(this.status)
                }

                this.status = "REFUSED"
            },
            cancelInvite: function (): void {
                if (this.status !== "PEDDING") {
                    throw new InvalidInviteStatusError(this.status)
                }

                this.status = "CANCELED"
            }
        },

        {
            id: 'y4eff12e-fd4c-44b4-9f0a-f684cc42e953',
            idStudent: '30ed35ad-2671-473f-9a0b-206771a0a786',
            idMentor: '80052778-6118-123c-8e49-138e71643faf',
            status: "PEDDING",
            createAt: new Date(),
            updateAt: new Date(),
            acceptInvite: function (): void {
                if (this.status != "PEDDING") {
                    throw new InvalidInviteStatusError(this.status);
                }

                this.status = "ACCEPTED";
            },
            refuseInvite: function (): void {
                if (this.status !== "PEDDING") {
                    throw new InvalidInviteStatusError(this.status)
                }

                this.status = "REFUSED"
            },
            cancelInvite: function (): void {
                if (this.status !== "PEDDING") {
                    throw new InvalidInviteStatusError(this.status)
                }

                this.status = "CANCELED"
            }
        },

        {
            id: 'wwwwwwe-fd4c-44b4-9f0a-f684cc42e953',
            idStudent: '66ed35ad-2671-473f-9z0b-206771a0a786',
            idMentor: '85952000-6118-123c-8e49-138e71643faf',
            status: "CANCELED",
            createAt: new Date(),
            updateAt: new Date(),
            acceptInvite: function (): void {
                if (this.status != "PEDDING") {
                    throw new InvalidInviteStatusError(this.status);
                }

                this.status = "ACCEPTED";
            },
            refuseInvite: function (): void {
                if (this.status !== "PEDDING") {
                    throw new InvalidInviteStatusError(this.status)
                }

                this.status = "REFUSED"
            },
            cancelInvite: function (): void {
                if (this.status !== "PEDDING") {
                    throw new InvalidInviteStatusError(this.status)
                }

                this.status = "CANCELED"
            }
        },

        {
            id: 'x4ezzzze-fd4c-44b4-9f0a-f684cc42e953',
            idStudent: '66ed35ad-2671-473f-9z0b-206771a0a786',
            idMentor: '85952000-6118-123c-8e49-138e71643faf',
            status: "REFUSED",
            createAt: new Date(),
            updateAt: new Date(),
            acceptInvite: function (): void {
                if (this.status != "PEDDING") {
                    throw new InvalidInviteStatusError(this.status);
                }

                this.status = "ACCEPTED";
            },
            refuseInvite: function (): void {
                if (this.status !== "PEDDING") {
                    throw new InvalidInviteStatusError(this.status)
                }

                this.status = "REFUSED"
            },
            cancelInvite: function (): void {
                if (this.status !== "PEDDING") {
                    throw new InvalidInviteStatusError(this.status)
                }

                this.status = "CANCELED"
            }
        },

        {
            id: 'yyyyyzz-fd4c-44b4-9f0a-f684cc42e953',
            idStudent: '66ed35ad-2671-473f-9z0b-206771a0a786',
            idMentor: '70152000-6118-123c-8e49-138e71643fa',
            status: "CANCELED",
            createAt: new Date(),
            updateAt: new Date(),
            acceptInvite: function (): void {
                if (this.status != "PEDDING") {
                    throw new InvalidInviteStatusError(this.status);
                }

                this.status = "ACCEPTED";
            },
            refuseInvite: function (): void {
                if (this.status !== "PEDDING") {
                    throw new InvalidInviteStatusError(this.status)
                }

                this.status = "REFUSED"
            },
            cancelInvite: function (): void {
                if (this.status !== "PEDDING") {
                    throw new InvalidInviteStatusError(this.status)
                }

                this.status = "CANCELED"
            }
        },

        {
            id: 'aaaaabb-fd4c-44b4-9f0a-f684cc42e953',
            idStudent: '66ed35ad-2671-473f-9z0b-206771a0a786',
            idMentor: '70152000-6118-123c-8e49-138e71643fa',
            status: "REFUSED",
            createAt: new Date(),
            updateAt: new Date(),
            acceptInvite: function (): void {
                if (this.status != "PEDDING") {
                    throw new InvalidInviteStatusError(this.status);
                }

                this.status = "ACCEPTED";
            },
            refuseInvite: function (): void {
                if (this.status !== "PEDDING") {
                    throw new InvalidInviteStatusError(this.status)
                }

                this.status = "REFUSED"
            },
            cancelInvite: function (): void {
                if (this.status !== "PEDDING") {
                    throw new InvalidInviteStatusError(this.status)
                }

                this.status = "CANCELED"
            }
        }


    ]




    async listByStatusAndMentorId(filter: Partial<MentoringInvite>): Promise<MentoringInvite[] | null> {

        if (!filter.idMentor || !filter.status) {
            throw new InvalidDataError()
        }

        const invites: MentoringInvite[] = []

        this.MentoringInvites.forEach(invite => {
            if (invite.idMentor == filter.idMentor && invite.status == filter.status) {
                invites.push(invite)
            }
        })

        return invites
    }

    async listByStatusAndStudentId(filter: Partial<MentoringInvite>): Promise<MentoringInvite[] | null> {

        if (!filter.idStudent || !filter.status) {
            throw new InvalidDataError()
        }

        const invites: MentoringInvite[] = []

        this.MentoringInvites.forEach(invite => {
            if (invite.idStudent == filter.idStudent && invite.status == filter.status) {
                invites.push(invite)
            }
        })

        return invites

    }

    async findOneInvite(filter: Partial<MentoringInvite>): Promise<MentoringInvite | null> {
        const MentoringInvite = await this.MentoringInvites.find(MentoringInvite => MentoringInvite.idStudent == filter.idStudent && MentoringInvite.idMentor == filter.idMentor && MentoringInvite.status == filter.status)

        if (!MentoringInvite) {
            return null
        }

        return MentoringInvite
    }


    async findById(id: string): Promise<MentoringInvite | null> {
        const MentoringInvites = await this.MentoringInvites.find(MentoringInvites => MentoringInvites.id == id)

        if (!MentoringInvites) {
            return null
        }

        return MentoringInvites
    }

    async findOne(filter: Partial<MentoringInvite>): Promise<MentoringInvite | null> {
        const filtred = await this.MentoringInvites.find(MentoringInvite => MentoringInvite.id == filter.id && MentoringInvite.idMentor == filter.idMentor && MentoringInvite.idStudent == filter.idStudent)

        if (!filtred) {
            return null
        }

        return filtred;

    }

    async findAcceptedInvite(filter: Partial<MentoringInvite>): Promise<MentoringInvite | null> {
        const accepted = await this.MentoringInvites.find(invite => invite.idStudent == filter.idStudent && invite.status == filter.status)

        if (!accepted) {
            return null
        }

        return accepted

    }


    async acceptInvite(filter: Partial<MentoringInvite>, update: Partial<MentoringInvite>): Promise<MentoringInvite | null> {
        const MentoringInvite = await this.MentoringInvites.find(MentoringInvites => MentoringInvites.id == filter.id && MentoringInvites.idStudent == filter.idStudent && MentoringInvites.idMentor == filter.idMentor && MentoringInvites.status == filter.status)


        console.log(filter.id)
        console.log(filter.idStudent)
        console.log(filter.idMentor)
        if (!MentoringInvite) {
            return null
        }

        if (update.status) {
            MentoringInvite.status = update.status;
        }

        if (update.updateAt) {
            MentoringInvite.updateAt = update.updateAt
        }

        return MentoringInvite
    }

    async findOneAndUpdate(filter: Partial<MentoringInvite>, updatePartial: Partial<MentoringInvite>): Promise<MentoringInvite | null> {

        const MentoringInvites = await this.MentoringInvites.find(MentoringInvites => MentoringInvites.idStudent == filter.idStudent && MentoringInvites.idMentor == filter.idMentor && MentoringInvites.status == filter.status)

        if (!MentoringInvites) {
            return null
        }

        if (updatePartial.status) {
            MentoringInvites.status = updatePartial.status;
        }

        if (updatePartial.updateAt) {
            MentoringInvites.updateAt = updatePartial.updateAt
        }

        return MentoringInvites

    }

    async save(entity: MentoringInvite): Promise<MentoringInvite | null> {

        if (!entity) {
            throw new InvalidDataError()
        }

        this.MentoringInvites.push(entity)

        return entity
    }


    async refuseAllPeddingInvites(filterData: Partial<MentoringInvite>, updateData: Partial<MentoringInvite>): Promise<void> {
        const MentoringInvites: MentoringInvite[] = []

        await this.MentoringInvites.forEach(invite => {
            if (invite.idStudent == filterData.idStudent && invite.status == filterData.status) {
                MentoringInvites.push(invite)
            }
        })

        MentoringInvites.forEach(invite => {
            invite.status = "REFUSED",
                invite.updateAt = new Date()
        })
    }

    async listByMentorId(idMentor: string): Promise<MentoringInvite[] | null> {

        if (!idMentor) {
            throw new InvalidDataError()
        }

        const invites: MentoringInvite[] = []

        this.MentoringInvites.forEach(invite => {
            if (invite.idMentor == idMentor) {
                invites.push(invite)
            }
        })

        return invites

    }

    async findByStudentId(idStudent: string): Promise<MentoringInvite | null> {
        const invite = await this.MentoringInvites.find(invite => invite.idStudent == idStudent)

        if (!invite) {
            return null
        }

        return invite
    }

    async listByStudentId(idStudent: string): Promise<MentoringInvite[] | null> {
        const invites: MentoringInvite[] = []

        this.MentoringInvites.forEach((invite) => {
            if (invite.idStudent == idStudent) {
                invites.push(invite)
            }
        })

        return invites
    }

    async findByMentorId(idMentor: string): Promise<MentoringInvite | null> {
        const invite = await this.MentoringInvites.find(invite => invite.idMentor == idMentor)

        if (!invite) {
            return null
        }

        return invite
    }


    async cancelInvite(filterInvite: Partial<MentoringInvite>): Promise<MentoringInvite | null> {
        const invite = await this.MentoringInvites.find(invite => filterInvite.idStudent == invite.idStudent && filterInvite.idMentor == invite.idMentor && filterInvite.id == invite.id)

        if (!invite) {
            return null
        }

        if (invite) {
            invite.status = "CANCELED",
                invite.updateAt = new Date()
        }

        return invite

    }


    findByEmail!: (email: string) => Promise<MentoringInvite | null>;
    update!: (entity: Partial<MentoringInvite>) => Promise<MentoringInvite | null>;



}