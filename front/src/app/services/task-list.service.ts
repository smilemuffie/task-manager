import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, merge } from 'rxjs';
import { Task , TaskList} from '../domain';
import { mapTo, map, reduce, count, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private readonly domain = `taskLists`;
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
      name: task.name
    };
    return this.http.patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .pipe(map(res => res as Task));
  }

  del(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http.delete(uri).pipe(mapTo(taskList));
  }

  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { projectId } })
      .pipe(map(res => res as TaskList[]));
  }

  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
    const drag$ = this.http.patch(dragUri, JSON.stringify({order: target.order}), {headers: this.headers}).pipe(map(res => res));
    const drop$ = this.http.patch(dropUri, JSON.stringify({ order: src.order }), {headers: this.headers}).pipe(map(res => res));
    return merge(drag$, drop$).pipe(reduce((arrs, list) => [...arrs, list], []));
  }

}
