import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
  public readonly menus: Array<PoMenuItem> = [
    {
      label: 'Home',
      link: '/',
      icon: 'fa fa-home fa-1x',
    },
    { label: 'A fazer', link: '/list', icon: 'po-icon po-icon-list' },
  ];
}
