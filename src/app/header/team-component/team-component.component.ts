import {Component, computed, signal} from '@angular/core';
import {ContextHolderService} from '../../context-holder.service';

export interface Task {
  name: string;
  teamList: string[] | null;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-team-component',
  templateUrl: './team-component.component.html',
  standalone: false,
  styleUrls: ['./team-component.component.css']
})
export class TeamComponentComponent {

  // Define tasks as signals in an array for generalization
  readonly tasks = [
    signal<Task>({
      name: 'Boss',
      teamList: null,
      completed: false,
      subtasks: [
        {name: 'Thierry', teamList: ['purple team', 'workflow team'], completed: false}
      ]
    }),
    signal<Task>({
      name: 'Developer',
      teamList: null,
      completed: false,
      subtasks: [
        {name: 'Céline', teamList: ['purple team'], completed: false},
        {name: 'Claire M', teamList: ['workflow team'], completed: false},
        {name: 'Frédéric', teamList: ['purple team'], completed: false},
        {name: 'Pierre-Olivier', teamList: null, completed: false},
        {name: 'Hamza', teamList: ['purple team'], completed: false},
        {name: 'Mehdi L', teamList: ['workflow team'], completed: false},
        {name: 'Yassine', teamList: ['workflow team'], completed: false},
        {name: 'Othmane', teamList: ['purple team'], completed: false},
        {name: 'Jaques', teamList: null, completed: false}
      ]
    }),
    signal<Task>({
      name: 'QA',
      teamList: null,
      completed: false,
      subtasks: [
        {name: 'Nada', teamList: ['purple team'], completed: false},
        {name: 'Fatima', teamList: ['purple team', 'workflow team'], completed: false},
        {name: 'Abdouraman', teamList: ['purple team'], completed: false},
        {name: 'Mehdi H', teamList: ['purple team'], completed: false},
        {name: 'Ahmed', teamList: ['purple team'], completed: false}
      ]
    }),
    signal<Task>({
      name: 'Product owner',
      teamList: null,
      completed: false,
      subtasks: [
        {name: 'Claire P', teamList: ['purple team'], completed: false},
        {name: 'Pauline', teamList: ['purple team'], completed: false},
        {name: 'Kai-Lin', teamList: ['workflow team'], completed: false}
      ]
    })
  ];

  // Computed properties for each task
  readonly partiallyComplete = this.tasks.map(taskSignal =>
    computed(() => {
      const task = taskSignal();
      if (!task.subtasks) {
        return false;
      }
      return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
    })
  );

  clickedButton: String = "";
  selectedMember: Set<string> = new Set<string>();

  isRotated: boolean = false;

  constructor(private contextHolderService: ContextHolderService) {
    this.contextHolderService.getContextHolder.subscribe(context => {
      this.clickedButton = context.clickedButton;
      this.selectedMember = context.selectedMember;

      if (context.editor !== 'team-component') {
        if ("All" === this.clickedButton)
          this.completeAll(true);
        else if ('Purple team' === this.clickedButton)
          this.completeTeam("purple team");
        else if ('Workflow team' === this.clickedButton)
          this.completeTeam("workflow team");
        else
          this.completeAll(false);
      }
    });

    this.contextHolderService.getSelectedMember.subscribe(selectedMember => this.incompleteByName(selectedMember));
  }

  isAllCompleted(): boolean {
    return this.tasks.every(task => task().completed);
  }

  isTeamCompleted(team: string): boolean {
    return this.tasks.every(taskSignal => {
      const task = taskSignal();
      if (!task.subtasks) {
        return false;
      }
      return task.subtasks.every(subtask => subtask.teamList?.includes(team) ? subtask.completed : !subtask.completed);
    });
  }

  updateButton() {
    if (this.isAllCompleted())
      this.contextHolderService.setClickedButton('team-component', "All");
    else if (this.isTeamCompleted('purple team'))
      this.contextHolderService.setClickedButton('team-component', "Purple team");
    else if (this.isTeamCompleted('workflow team'))
      this.contextHolderService.setClickedButton('team-component', "Workflow team");
    else
      this.contextHolderService.setClickedButton('team-component', "");
  }

  // Generalized update method
  update(taskSignal: typeof this.tasks[number], completed: boolean, index?: number) {

    taskSignal.update(task => {
      if (index === undefined) {
        // Update main task and propagate to all subtasks
        task.completed = completed;
        task.subtasks?.forEach(subtask => {
          subtask.completed = completed
          if (completed)
            this.selectedMember.add(subtask.name);
          else
            this.selectedMember.delete(subtask.name);
        });
      } else {
        // Update specific subtask and adjust parent task status
        if (task.subtasks) {
          task.subtasks[index].completed = completed;
          if (completed)
            this.selectedMember.add(task.subtasks[index].name);
          else
            this.selectedMember.delete(task.subtasks[index].name);

          task.completed = task.subtasks.every(subtask => subtask.completed);
        }
      }

      this.updateButton();

      this.contextHolderService.setSelectedMember(this.selectedMember);

      return {...task};
    });
  }


  completeAll(complete: boolean): void {
    this.tasks.forEach((taskSignal) =>
      taskSignal.update((task) => ({
        ...task,
        completed: complete,
        subtasks: task.subtasks?.map((subtask) => {
          if (complete)
            this.selectedMember.add(subtask.name);
          else
            this.selectedMember.delete(subtask.name);
          return {...subtask, completed: complete};
        }),
      }))
    );
  }

  completeTeam(team: string) {
    this.tasks.forEach((taskSignal) =>
      taskSignal.update(task => {

          task.subtasks?.forEach((subtask) => {
            if (!subtask.teamList) {
              this.selectedMember.delete(subtask.name);
              subtask.completed = false;
            } else {
              if (subtask.teamList.includes(team))
                this.selectedMember.add(subtask.name);
              else
                this.selectedMember.delete(subtask.name);

              subtask.completed = subtask.teamList.includes(team);
            }
          });

          task.completed = task.subtasks ? task.subtasks.every(subtask => subtask.completed) : false;

          return {...task};
        }
      )
    );
  }

  incompleteByName(selectedMember: string) {
    this.tasks.forEach((taskSignal) =>
      taskSignal.update(task => {

          task.subtasks?.forEach((subtask) => {
            if (selectedMember === subtask.name) {
              this.selectedMember.delete(subtask.name);
              subtask.completed = false;
            }
          });

          task.completed = task.subtasks ? task.subtasks.every(subtask => subtask.completed) : false;

          this.updateButton();

          return {...task};
        }
      )
    );
  }

  toggleArrow() {
    this.isRotated = !this.isRotated;
  }

}
