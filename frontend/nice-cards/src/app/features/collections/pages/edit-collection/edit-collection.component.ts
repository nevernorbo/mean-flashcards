import { Component, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditCollectionForm } from '@features/collections/models/card.interface';
import { CollectionService } from '@features/collections/services/collection.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormInputComponent } from '@shared/components/form-input/form-input.component';
import { CircleX, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'edit-collection-popup',
  imports: [
    LucideAngularModule,
    FormInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: 'edit-collection.component.html',
})
export class EditCollectionPopupComponent {
  readonly CircleX = CircleX;

  editCollectionForm!: FormGroup;
  popupClosed = output();

  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionService
  ) {}

  ngOnInit() {
    const currentCardCollection = this.collectionService.cardCollection$();

    this.editCollectionForm = this.fb.group({
      title: [currentCardCollection.title, Validators.required],
      summary: [currentCardCollection.summary],
      visibility: [currentCardCollection.visibility, Validators.required],
    });
  }

  handleSubmit() {
    console.log(this.editCollectionForm.value as EditCollectionForm);

    this.collectionService
      .updateCardCollection(this.editCollectionForm.value as EditCollectionForm)
      .subscribe({
        next: () => {
          this.collectionService.getCardCollection(this.collectionService.cardCollection$()._id!);
        },
        error: (error) => {
          console.log('Error trying to create new card collection: ', error);
        },
        complete: () => {
            this.closePopup();
        }
      });
  }

  closePopup() {
    this.popupClosed.emit();
  }
}
