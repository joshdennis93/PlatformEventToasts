# PlatformEventToasts
Declarative approach to creating custom toast messages via Platform Events

## INSTALLATION/SETUP:
1. Clone/download files from repo.
2. Use your favourite metadata management tool to add them to your current metadata and push to your org.
3. Ensure the Notification__e platform event is created & has the Message, Mode, RecordId, Title & Variant custom fields.
4. Either add 'notification' lwc to a utility bar (via app manager in setup) or add it specifically to a lightning record page.
5. Create a process or flow (or anything else) to trigger the notification.
    - The trigger should be any standard action e.g. ISCHANGED(Lead.LastName)
    - The output (i.e. what defines the toast) is a record create - create a new Notification__e record. Title and Message fields are required, all else is optional. Refer to SF documentation at https://developer.salesforce.com/docs/component-library/bundle/lightning-platform-show-toast-event/documentation.

### NOTES:
- This is currently only able to send simple notifications which don't include URLs (e.g. no 'Click _here_ to view reference documentation). You can extend the functionality to include this by playing around with the messageData parameter (see https://developer.salesforce.com/docs/component-library/bundle/lightning-platform-show-toast-event/documentation).
- You can make your message up to 10k characters long (this is an arbitrary limit as the field itself is a rich text field), but after about 230 characters the toast message clips off my screen so be careful.
- I didn't test it, but if you use flow & perhaps a text template to set your message parameter, you may be able to format the message with more than plain text?
- If the lwc is not visible (i.e. not on a utility bar and not VISIBLE on a record page, like being made conditionally invisible or not on an opened tab), it will not be able to listen to & show any notification.

## USAGE:
The Notification__e 'object' is a platform event and by itself, doesn't actually do too much. However, you can publish this event declaratively by using a process/flow in the same way you'd regularly create a record. Once the event has been published, it's up to you(r components) to subscribe to it and use it.

The lwc 'notification' simply listens for a Notification__e event and once it hears one, it will create the toast. The lwc itself can be added to a utility bar (and therefore apply globally) if you use the utility bar on your app, and otherwise you can specifically control where the notification should appear by adding the lwc to a record page. The lwc has no user interface elements, and therefore is represented as an invisible box. Add it to the bottom of the record page. Note that if the componnent isn't visible e.g. hidden or on a tab not current opened, it won't show any notification.

## USE CASES:
- Remind users that a process/record update must be made, without preventing them from updating said record.
- Alert users that a related record is still in draft and will not be able to be sent for approval.
- Surprise users that they're the 100th user of the day to update a record and that they're eligible for a prize!

## EXAMPLE:
tba