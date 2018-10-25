import { MatIconRegistry } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

export const loadSvgSource = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = `/assets/img`;
  const sidebarDir = `${imgDir}/sidebar`;
  const dayDir = `${imgDir}/days`;
  const iconDir = `${imgDir}/icons`;
  const avatarDir = `${imgDir}/avatar`;

  ir.addSvgIcon(`menu`, ds.bypassSecurityTrustResourceUrl(`${iconDir}/menu.svg`));
  ir.addSvgIcon(`move`, ds.bypassSecurityTrustResourceUrl(`${iconDir}/move.svg`));
  ir.addSvgIcon(`add`, ds.bypassSecurityTrustResourceUrl(`${iconDir}/add.svg`));
  ir.addSvgIcon(`delete`, ds.bypassSecurityTrustResourceUrl(`${iconDir}/delete.svg`));
  ir.addSvgIcon(`menu`, ds.bypassSecurityTrustResourceUrl(`${iconDir}/menu.svg`));
  ir.addSvgIcon(`day`, ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`));
  ir.addSvgIcon(`month`, ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));
  ir.addSvgIcon(`projext`, ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`));
  ir.addSvgIcon(`projects`, ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));
  ir.addSvgIcon(`week`, ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));
  // Add a list of svg
  ir.addSvgIconSetInNamespace(`avatars`, ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));

  const days = [1, 2, 3, 4, 5, 6, 23, 24, 25, 26, 27];
  days.forEach(d => ir.addSvgIcon(`day${d}`, ds.bypassSecurityTrustResourceUrl(`${dayDir}/day${d}.svg`)));
};

