

export class NotEnoughMeetings extends Error {

    name: "NotEnoughMeetings"

    constructor() {
        super(`NotEnoughMeetings: there are not enough meetings to complete the mentoring.`)
    }
}