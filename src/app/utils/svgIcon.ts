import { MatIconRegistry } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

export const loadSvgSource = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = `/assets/img`;
  const sidebarDir = `${imgDir}/sidebar`;
  const dayDir = `${imgDir}/days`;
  const iconDir = `${imgDir}/icons`;

  ir.addSvgIcon(`menu`, ds.bypassSecurityTrustResourceUrl(`${iconDir}/menu.svg`));
  ir.addSvgIcon(`day`, ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`));
  ir.addSvgIcon(`month`, ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));
  ir.addSvgIcon(`projext`, ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`));
  ir.addSvgIcon(`projects`, ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));
  ir.addSvgIcon(`week`, ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));

  const days = [1, 2, 3, 4, 5, 6, 23];
  days.forEach(d => ir.addSvgIcon(`day${d}`, ds.bypassSecurityTrustResourceUrl(`${dayDir}/day${d}.svg`)));
};

