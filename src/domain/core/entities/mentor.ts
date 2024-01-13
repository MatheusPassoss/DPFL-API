
export interface MentorData  {
    name: string
}

interface teste {
    mentoria: {
      invites: string[]
      studentId: null
      mentoriaId: null
    }
}

export class Mentor implements MentorData {
    name: string

    private constructor(mentor: Mentor) {
        this.name = mentor.name
    }

    static create(mentor: Mentor, valid: boolean) {

        if (valid) {
            return new Mentor(mentor)
        }

        return 'Failed'
    }
}