import { Component, output } from '@angular/core';
import { LucideAngularModule, CircleX } from 'lucide-angular';
import { FormInputComponent } from '@shared/components/form-input/form-input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardService } from '@features/collections/services/card.service';
import { CreateNewCollectionForm } from '@features/collections/models/card.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'create-card-popup',
  imports: [
    LucideAngularModule,
    FormInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: 'new-collection.component.html',
})
export class NewCollectionComponent {
  readonly CircleX = CircleX;

  newCollectionForm!: FormGroup;
  popupClosed = output();

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newCollectionForm = this.fb.group({
      title: ['', Validators.required],
      visibility: ['', Validators.required],
    });
  }

  handleSubmit() {
    this.cardService
      .createCardCollection(
        this.newCollectionForm.value as CreateNewCollectionForm
      )
      .subscribe({
        next: (createdId) => {
          this.router.navigateByUrl(`/card-collection/${createdId}`);
        },
        error: (error) => {
          console.log('Error trying to create new card collection: ', error);
        },
      });
  }

  closePopup() {
    this.popupClosed.emit();
  }
}
