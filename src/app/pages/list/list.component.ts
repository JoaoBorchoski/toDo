import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { List } from 'src/app/interfaces/list.interface';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public items: any = [];
  public tableActions: any = [];
  public pageActions: any = [];
  public filterSettings: any = [];
  public fields: any = [];

  item: List = {
    name: '',
    description: '',
  };

  constructor(
    private listService: ListService,
    private router: Router,
    private poDialogService: PoDialogService,
    private poNotificationService: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.getList();
    this.getActions();
    this.setFields();
  }

  viewItem(item: any) {
    if (item && item.id) {
      this.router.navigate([`/viewItem/${item.id}`]);
    }
  }

  getActions() {
    this.pageActions.push({
      label: 'Novo',
      action: this.newItem.bind(this),
      icon: 'fa-solid fa-plus',
    });

    this.tableActions = [
      {
        label: 'edit',
        action: this.editItem.bind(this),
        icon: 'fa-solid fa-pen',
      },
      {
        label: 'view',
        action: this.viewItem.bind(this),
        icon: 'fa-solid fa-eye',
      },
      {
        label: 'delete',
        action: this.excludeItem.bind(this),
        icon: 'fa-solid fa-trash',
      },
    ];
  }

  setFields() {
    this.fields = [
      { property: 'id', key: true, visible: false },
      {
        property: 'name',
        label: 'Nome',
      },
      {
        property: 'description',
        label: 'Descrição',
      },
    ];
  }

  editItem(item: any) {
    if (item) this.router.navigate([`/updateItem/${item.id}`]);
  }

  excludeItem(item: any) {
    this.poDialogService.confirm({
      title: 'Excluir',
      message: 'Deseja excluir esse item permanentemente',
      confirm: this.removeItem.bind(this, item),
    });
  }

  private removeItem(item: any) {
    this.listService.deleteItem(item.id).subscribe({
      next: (response: any) => {
        this.poNotificationService.success({
          message: 'Sucesso',
          duration: 2000,
        });
        window.location.reload();
      },
    });
  }

  newItem() {
    this.router.navigate(['/newItem']);
  }

  getList() {
    this.listService.getList().subscribe((list) => {
      this.items = list;
    });
  }
}
