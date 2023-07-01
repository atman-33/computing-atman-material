import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookmarksDocument, CreateBookmarkGQL } from '../../../../../generated-types';

@Component({
  selector: 'app-create-bookmark',
  templateUrl: './create-bookmark.component.html',
  styleUrls: ['./create-bookmark.component.scss'],
})
export class CreateBookmarkComponent {
  bookmarkName = new FormControl('', [Validators.required]);

  constructor(
    private readonly createBookmarkGql: CreateBookmarkGQL,
    private readonly dialogRef: MatDialogRef<CreateBookmarkComponent>) { }

  getBookmarkNameError() {
    if (this.bookmarkName.hasError('required')) {
      return 'You must enter a value.';
    }
    return '';
  }

  createBookmark() {
    this.createBookmarkGql
      .mutate(
        {
          createBookmarkData: { name: this.bookmarkName.value ?? '' }
        },
        {
          refetchQueries: [{
            query: BookmarksDocument  // after create bookmark, add new bookmark on the screen
          }]
        })
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
