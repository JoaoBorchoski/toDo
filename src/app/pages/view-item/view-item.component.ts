import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoPageAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements OnInit {
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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.idURL = this.activatedRoute.snapshot.paramMap.get('id');

    this.pageButtonsBuilder();

    if (this.idURL) {
      this.subscriptions.add(this.getItem(this.idURL));
    }
  }

  pageButtonsBuilder() {
    this.pageActions.push({
      label: 'Voltar',
      action: this.goBack.bind(this),
    });

    return null;
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
