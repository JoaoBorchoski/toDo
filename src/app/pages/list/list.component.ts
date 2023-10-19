import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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

  @Input() noCopy?: boolean = false;

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

  getList() {
    this.listService.getList().subscribe((list) => {
      this.items = list;
    });
  }

  viewItem(item: any) {
    if (item && item.id) {
      this.router.navigate([`/viewItem/${item.id}`]);
    } else
      this.router.navigate([`/viewItem/${this.getSelectedItemsKeys()[0].id}`]);
  }

  getActions() {
    this.pageActions.push(
      {
        label: 'Novo',
        action: this.newItem.bind(this),
        icon: 'fa-solid fa-plus',
      },
      {
        label: 'Editar',
        action: this.editItem.bind(this),
        disabled: this.multipleItemIsSelected.bind(this),
        icon: 'fa-solid fa-pen',
      },
      {
        label: 'Deletar',
        action: this.excludeItens.bind(this),
        disabled: this.itemIsSelected.bind(this),
        icon: 'fa-solid fa-trash',
      },
      {
        label: 'Visualizar',
        action: this.viewItem.bind(this),
        disabled: this.multipleItemIsSelected.bind(this),
        icon: 'fa-solid fa-eye',
      }
    );

    if (!this.noCopy) {
      this.pageActions.push({
        label: 'Copiar',
        action: this.copyItem.bind(this),
        disabled: this.multipleItemIsSelected.bind(this),
        icon: 'fa-solid fa-copy',
      });
    }

    this.tableActions = [
      {
        label: 'Editar',
        action: this.editItem.bind(this),
        icon: 'fa-solid fa-pen',
      },
      {
        label: 'Visualizar',
        action: this.viewItem.bind(this),
        icon: 'fa-solid fa-eye',
      },
      {
        label: 'Deletar',
        action: this.excludeItem.bind(this),
        icon: 'fa-solid fa-trash',
      },
    ];

    if (!this.noCopy) {
      this.tableActions.push({
        label: 'Copiar',
        action: this.copyItem.bind(this),
        icon: 'fa-solid fa-copy',
      });
    }
  }

  copyItem(item: any) {
    if (item.id) this.router.navigate([`/newItem/${item.id}`], {});
    else
      this.router.navigate([`/newItem/${this.getSelectedItemsKeys()[0].id}`]);
  }

  getSelectedItemsKeys() {
    if (this.items.length > 0) {
      const resources = this.items.filter((item: any) => item.$selected);

      if (resources.length === 0) {
        return;
      }
      return resources;
    }
  }

  itemIsSelected() {
    if (this.getSelectedItemsKeys()) {
      return false;
    }
    return true;
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
    else
      this.router.navigate([`updateItem/${this.getSelectedItemsKeys()[0].id}`]);
  }

  excludeItem(item: any) {
    this.poDialogService.confirm({
      title: 'Excluir',
      message: 'Deseja excluir esse item permanentemente',
      confirm: this.removeItem.bind(this, item),
    });
  }

  excludeItens() {
    const ids = this.getSelectedItemsKeys().map((item: any) => item.id);
    if (ids.length == 0) return;

    this.poDialogService.confirm({
      title: 'Deseja excluir multiplos items?',
      message: 'Tem certeza?',
      confirm: this.removeItems.bind(this, ids),
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

  private removeItems(ids: any[]) {
    const payload = ids;

    payload.forEach((item) => {
      this.listService.deleteItem(item).subscribe({
        next: () => {
          console.log('sucesso');
        },
      });
    });
    window.location.reload();
  }

  newItem() {
    this.router.navigate(['/newItem']);
  }

  multipleItemIsSelected() {
    if (this.getSelectedItemsKeys()) {
      return this.getSelectedItemsKeys().length !== 1;
    }
    return true;
  }
}
