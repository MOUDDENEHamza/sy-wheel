import { Component, computed, signal } from '@angular/core';

export interface Task {
  name: string;
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
      completed: false,
      subtasks: [{ name: 'Thierry', completed: false }],
    }),
    signal<Task>({
      name: 'Developer',
      completed: false,
      subtasks: [{ name: 'Céline', completed: false }, { name: 'Claire M', completed: false },
        { name: 'Frédéric', completed: false }, { name: 'Pierre-Olivier', completed: false },
        { name: 'Hamza', completed: false }, { name: 'Mehdi L', completed: false },
        { name: 'Yassine', completed: false }, { name: 'Othmane', completed: false },
        { name: 'Jaques', completed: false }],
    }),
    signal<Task>({
      name: 'QA',
      completed: false,
      subtasks: [{ name: 'Nada', completed: false }, { name: 'Fatima', completed: false },
        { name: 'Abdouraman', completed: false }, { name: 'Mehdi H', completed: false },
        { name: 'Ahmed', completed: false }],
    }),
    signal<Task>({
      name: 'Product owner',
      completed: false,
      subtasks: [{ name: 'Claire P', completed: false }, { name: 'Pauline', completed: false },
        { name: 'Kai-Lin', completed: false }],
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

  // Generalized update method
  update(taskSignal: typeof this.tasks[number], completed: boolean, index?: number) {
    taskSignal.update(task => {
      if (index === undefined) {
        // Update main task and propagate to all subtasks
        task.completed = completed;
        task.subtasks?.forEach(subtask => (subtask.completed = completed));
      } else {
        // Update specific subtask and adjust parent task status
        if (task.subtasks) {
          task.subtasks[index].completed = completed;
          task.completed = task.subtasks.every(subtask => subtask.completed);
        }
      }
      return { ...task };
    });
  }
}
