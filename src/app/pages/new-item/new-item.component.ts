import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit {
  public readonly pageActions: Array<PoPageAction> = [];
  public id: any | number;
  public readonly = false;
  public result: any;

  public itemForm = this.formBuilder.group({
    name: '',
    description: '',
  });

  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private listService: ListService,
    private formBuilder: FormBuilder,
    private poNotificationService: PoNotificationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.pageButtonsBuilder();
    if (this.id) {
      this.subscriptions.add(this.getItem(this.id));
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
        action: this.cancel.bind(this),
      }
    );

    return null;
  }

  private save(item: any, newItem?: boolean) {
    this.listService.newItem(item).subscribe({
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

  cancel(): void {
    this.router.navigate(['/list']);
  }

  getItem(id: any) {
    this.listService.getItemById(id).subscribe({
      next: (result) => {
        this.itemForm.patchValue({
          description: result.description,
          name: result.name,
        });
      },
    });
  }
}
