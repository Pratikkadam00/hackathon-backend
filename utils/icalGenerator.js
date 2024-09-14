import ical from 'ical-generator';

export const createEventInvite = (title, date) => {
    const cal = ical({ name: `Invitation: ${title}` });

    cal.createEvent({
        start: new Date(date),
        end: new Date(new Date(date).getTime() + 60 * 60 * 1000), // 1 hour event
        summary: title,
        description: `This is an invitation for the event: ${title}.`,
        location: 'Online',
    });

    return cal.toString();
};
