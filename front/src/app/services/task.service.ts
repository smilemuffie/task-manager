import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Task, TaskList } from '../domain';
import { mapTo, map, mergeMap, count, switchMap, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly domain = `tasks`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
  ) { }

  add(task: Task): Observable<Task> {
    task.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post(uri, JSON.stringify(task), { headers: this.headers })
      .pipe(map(res => res as Task));
  }

  update(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      desc: task.desc,
      priority: task.priority,
      dueDate: task.dueDate,
      reminder: task.reminder,
      remark: task.remark,
      ownerId: task.ownerId,
      participantIds: task.participantIds
    };
    return this.http.patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .pipe(map(res => res as Task));
  }

  del(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.delete(uri).pipe(mapTo(task));
  }

  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { taskListId } })
      .pipe(map(res => res as Task[]));
  }

  getByLists(lists: TaskList[]): Observable<Task[]> {
    return from(lists).pipe(mergeMap(list => this.get(list.id)), reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], []));
  }

  complete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.patch(uri, JSON.stringify({completed: !task.completed}), { headers: this.headers })
      .pipe(map(res => res as Task));
  }

  move(taskId: string, taskListId: string): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}`;
    return this.http.patch(uri, JSON.stringify({taskListId}), { headers: this.headers })
      .pipe(map(res => res as Task));
  }

  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId).pipe(
        mergeMap((tasks: Task[]) => from(tasks)),
        mergeMap((task: Task) => this.move(task.id, targetListId)),
        reduce((arrs: Task[], x: Task) => [...arrs, x], [])
      );
  }
}
