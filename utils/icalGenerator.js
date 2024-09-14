import ical from 'ical-generator';

export const createEventInvite = (date,title ) => {
    const cal = ical({ name: `Invitation: ${title}` });

    cal.createEvent({
        start: new Date(date),
        end: new Date(), // 1 hour event
        summary: title,
        description: `This is an invitation for the event: ${title}.`,
        location: 'Online',
    });

    return cal.toString();
};
