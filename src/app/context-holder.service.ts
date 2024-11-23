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

  getContextHolder = this.contextHolder.asObservable();

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

}
