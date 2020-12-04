import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';

export default class Notification extends LightningElement {
    channelName = '/event/Notification__e';
    isSubscribeDisabled = false;
    isUnsubscribeDisabled = !this.isSubscribeDisabled;

    subscription = {};

    // Initializes the component
    connectedCallback() {
        // Register error listener
        this.registerErrorListener();

        // Callback invoked whenever a new event message is received
        const thisReference = this;
        const messageCallback = function(response) {

        let obj = JSON.parse(JSON.stringify(response));

        console.log('New message received: ', JSON.stringify(response));
        // Response contains the payload of the new message received

        // Take the parameters set in the process/flow which sent the platform event to construct the toast
        const evt = new ShowToastEvent({
            title: obj.data.payload.Title__c,
            message: obj.data.payload.Message__c,
            variant: obj.data.payload.Variant__c,
            mode: obj.data.payload.Mode__c,
            recordId: obj.data.payload.RecordId__c,
        });

        // And then actually send the event off
        thisReference.dispatchEvent(evt);
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then(response => {
            // Response contains the subscription information on subscribe call
            console.log('Subscription request sent to: ', JSON.stringify(response.channel));
            this.subscription = response;
        });

    }

    registerErrorListener() {
        // Invoke onError empApi method
        onError(error => {
            console.log('Received error from server: ', JSON.stringify(error));
            // Error contains the server-side error
        });
    }

}