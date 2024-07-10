import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Config } from '../../../config';
import { Observable } from 'rxjs';
import { AbsenceDefinition } from '../models/absence-definition';
import { Absence } from '../models/absence';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private readonly http = inject(HttpClient);

  /**
   * Get AbsenceDefinitions from server.
   */
  getAbsenceDefinitions(): Observable<AbsenceDefinition[]> {
    return this.http.get<AbsenceDefinition[]>(Config.apiUrl + '/AbsenceDefinitions');
  }

  /**
   * Add Absence to db.
   */
  addAbsence(absence: Absence): Observable<Absence> {
    return this.http.post<Absence>(Config.apiUrl + '/Absences', absence)
  }
}
