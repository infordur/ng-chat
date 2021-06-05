import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'ng-chat';

    username: string = 'username';
    message: string = '';
    messages: any[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        Pusher.logToConsole = true;
        const pusher = new Pusher('e709e4a76036b113e861', {
            cluster: 'eu',
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', (data: any) => {
            this.messages.push(data);
        });
    }

    submit(): void {
        this.http
            .post('http://localhost:3000/api/messages', {
                username: this.username,
                message: this.message,
            })
            .subscribe(() => {
                this.message = '';
            });
    }
}
