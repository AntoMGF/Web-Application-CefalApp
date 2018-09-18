import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  _migraineHours: number = 0;
  _sleepHours: number = 0;
  _phoneUsageHours: number = 0;

  constructor() { }

  ngOnInit() {

  }

  submit() {
    alert('Migraine hours: ' + this._migraineHours + '\nSleep hourse: '+this._sleepHours+'\nPhone usage hours: '+this._phoneUsageHours);

  }

}
