import { Component, input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Card } from '@features/collections/models/card.interface';
import { CardService } from '@features/collections/services/cards.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { OutlinedButtonComponent } from '@shared/components/button/outlined-button.component';
import { LucideAngularModule, Save, X } from 'lucide-angular';

@Component({
  selector: 'edit-flash-card',
  imports: [
    LucideAngularModule,
    ButtonComponent,
    OutlinedButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-flash-card.component.html',
})
export class EditFlashCardComponent implements OnInit {
  readonly Save = Save;
  readonly X = X;

  editedCardForm!: FormGroup;

  isEdit = input<boolean>(false);

  frontFormControl = new FormControl();
  backFormControl = new FormControl();

  finishedEditing = output();

  constructor(
    private fb: FormBuilder,
    private cardService: CardService
  ) {
    this.editedCardForm = this.fb.group({
      back: [''],
      front: [''],
    });
  }

  ngOnInit() {
    if (this.isEdit()) {
      this.frontFormControl.setValue(this.cardService.currentCard$().front);
      this.backFormControl.setValue(this.cardService.currentCard$().back);
    }
  }

  saveClickedCreate() {
    const card = {
      front: this.frontFormControl.value,
      back: this.backFormControl.value,
      order: this.cardService.cards$().length + 1,
    } as Card;

    this.cardService.createCard(card).subscribe({
      next: (response) => {
        this.cardService.currentCard$.set(card);
        this.finishEditing();
        console.log('Successfully created new card', response);
      },
      error: (error) => {
        console.log('Error while trying to create new card: ', error);
      },
    });
  }

  saveClickedUpdate() {
    this.cardService
      .updateCard(this.frontFormControl.value, this.backFormControl.value)
      .subscribe({
        next: (response) => {
          this.finishEditing();
          this.cardService.currentCard$.set({
            front: this.frontFormControl.value,
            back: this.backFormControl.value,
            order: this.cardService.currentCard$().order,
          });
          this.cardService.getCards();
          console.log('Successfully updated card', response);
        },
        error: (error) => {
          console.log('Error while trying to create new card: ', error);
        },
      });
  }

  finishEditing() {
    this.finishedEditing.emit();
  }
}
