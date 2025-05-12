import { Component, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateNewCollectionForm } from '@features/collections/models/card.interface';
import { CollectionService } from '@features/collections/services/collection.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormInputComponent } from '@shared/components/form-input/form-input.component';
import { CircleX, LucideAngularModule } from 'lucide-angular';

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
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.newCollectionForm = this.fb.group({
      title: ['', Validators.required],
      visibility: ['', Validators.required],
    });
  }

  handleSubmit() {
    this.collectionService.createCardCollection(
      this.newCollectionForm.value as CreateNewCollectionForm
    );
  }

  closePopup() {
    this.popupClosed.emit();
  }
}
