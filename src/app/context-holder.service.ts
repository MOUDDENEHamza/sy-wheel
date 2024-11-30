import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ContextHolder} from './context-holder';

@Injectable({
  providedIn: 'root'
})
export class ContextHolderService {

  private contextHolder = new BehaviorSubject<ContextHolder>(
    {editor: "", clickedButton: "", selectedMember: new Set<string>()}
  )

  private selectedMember = new BehaviorSubject('');

  private expanded = new BehaviorSubject(true);

  getContextHolder = this.contextHolder.asObservable();

  getSelectedMember = this.selectedMember.asObservable();

  getExpanded = this.expanded.asObservable();

  constructor() { }

  // Method to update `clickedButton`
  setClickedButton(editor: string, clickedButton: string): void {
    const currentContext = this.contextHolder.value; // Get the current context
    this.contextHolder.next({ ...currentContext, editor, clickedButton }); // Update only editor and clickedButton
  }

  // Method to update `selectedMember`
  setSelectedMember(selectedMember: Set<string>): void {
    const currentContext = this.contextHolder.value; // Get the current context
    this.contextHolder.next({ ...currentContext, selectedMember }); // Update only selectedMember
  }

  setLastSelectedMember(selectedMember: string): void {
    this.selectedMember.next(selectedMember); // Update selectedMember
  }

  setExpanded(expanded: boolean) {
    this.expanded.next(expanded); // Update expanded
  }

}
