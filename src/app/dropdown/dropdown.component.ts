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
  selectAll = false
  selectCaption = 'Select All'
  tags: string[] = []


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
    this.processSelected()
  }

  private processSelected() {
    this.selected = this.data.filter(d => d.selected)
    if (this.selected.length) {
      //todo
      //this.tags = this.selected.slice(0, 3).map(d => d.label)
    } else {
      this.tags = []
    }
  }

  onOptionClicked(d: DropdownData) {
    if (!this.showDropdown) {
      return
    }
    d.selected = !d.selected
    this.processSelected()
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

  onToggleDropdown(evt) {
    evt.stopPropagation()
    this.showDropdown = !this.showDropdown
  }

  onSelectAll() {
    if (this.selectAll) {
      this._data = this._data.map(d => {
        d.selected = true
        return d
      })
      this.selectedLabels.emit(this._data)
      this.selectCaption = 'Unselect All'
    } else {
      this._data = this._data.map(d => {
        d.selected = false
        return d
      })
      this.selectedLabels.emit([])
      this.selectCaption = 'Select All'
    }
    this.processSelected()
  }

}
