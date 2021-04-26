import { DropdownData } from './dropdown/dropdown-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dropdown';

  data: DropdownData[] = []

  ngOnInit(): void {
    this.data.push({label: 'Label 1', image: 'assets/img/person.jpg'})
    this.data.push({label: 'Label 22', image: ''})
    this.data.push({label: 'Label 333', image: '', selected: true})
    this.data.push({label: 'Label 4444', image: ''})
    this.data.push({label: 'Label 55555', image: ''})
  }

  onSelectedLabels(d) {
    console.log('on selected', d)
  }

}
