import { DropdownData } from './dropdown-data';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input('data') data: DropdownData[]
  @Input('label') label: string
  @Output() selectedLabels: EventEmitter<DropdownData[]> = new EventEmitter<DropdownData[]>()

  @ViewChild('dropdown') dropdown: ElementRef
  @ViewChild('select') select: ElementRef

  filter: string
  _data: DropdownData[]
  showDropdown = false
  selected: DropdownData[]

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.dropdown && !this.dropdown.nativeElement.contains(e.target)
        && e.target != this.select.nativeElement
      ) {
        this.showDropdown = false
      }
    })
  }

  ngOnInit(): void {
    this._data = this.data
    this.selected = this.data.filter(d => d.selected)
  }

  onOptionClicked(d: DropdownData) {
    d.selected = !d.selected
    this.selected = this.data.filter(d => d.selected)
    this.selectedLabels.emit(this.selected)
  }

  onFilterChange() {
    if (this.filter) {
      const f = this.filter.toLocaleLowerCase()
      this._data = this.data.filter(v => v.label.toLocaleLowerCase().includes(f))
    } else {
      this._data = this.data
    }
  }

  onToggleDropdown() {
    this.showDropdown = !this.showDropdown
  }

}
