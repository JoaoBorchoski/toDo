import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss'],
})
export class UpdateItemComponent implements OnInit {
  item: any;
  idURL: any;

  public readonly = false;
  public result: any;
  public literals: any = {};

  itemForm = this.formBuilder.group({
    id: 1,
    name: '',
    description: '',
  });

  subscriptions = new Subscription();
  public readonly pageActions: Array<PoPageAction> = [];

  constructor(
    private router: Router,
    private listService: ListService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private poNotificationService: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.idURL = this.activatedRoute.snapshot.paramMap.get('id');

    this.pageButtonsBuilder();

    if (this.idURL) {
      this.subscriptions.add(this.getItem(this.idURL));
    }
  }

  pageButtonsBuilder() {
    this.pageActions.push(
      {
        label: 'Salvar',
        action: () => this.save(this.itemForm.value),
      },
      {
        label: 'Salvar e Novo',
        action: () => this.save(this.itemForm.value, true),
      },
      {
        label: 'Cancelar',
        action: this.goBack.bind(this),
      }
    );

    return null;
  }

  private save(item: any, newItem?: boolean) {
    this.listService.update(item).subscribe({
      next: () => {
        this.poNotificationService.success({
          message: 'Sucesso',
          duration: 2000,
        });
        if (newItem) {
          this.itemForm.reset();
          this.router.navigate(['/newItem']);
        } else {
          this.router.navigate(['/list']);
        }
      },
    });
  }

  goBack() {
    this.router.navigate(['/list']);
  }

  getItem(id: any) {
    this.listService.getItemById(id).subscribe({
      next: (result) => {
        this.itemForm.patchValue({
          description: result.description,
          name: result.name,
          id: result.id,
        });
        this.item = result;
      },
    });
  }
}
