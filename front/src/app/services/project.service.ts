import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Project } from '../domain';
import {mapTo, map, mergeMap, count, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly domain = `projects`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
  ) { }

  add(project: Project): Observable<Project> {
    project.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post(uri, JSON.stringify(project), {headers: this.headers})
                    .pipe(map(res => res as Project));
  }

  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    };
    return this.http.patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .pipe(map(res => res as Project));
  }

  del(project: Project): Observable<Project> {
    const delTasks$ = from(project.taskLists).pipe(mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`)), count());
    return delTasks$.pipe(
      switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`)),
      mapTo(project)
      );
  }

  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {params: {userId}})
      .pipe(map(res => res as Project[]));
  }

}
