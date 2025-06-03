import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
// import { QuillEditorComponent, QuillModule } from 'ngx-quill';

// ElementRef use?
// ViewChild use?

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  faImage = faImage;

  images: string[] = [];

  onImagePicked(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const remainingSlots = 4 - this.images.length;
      const filesToAdd = Array.from(input.files).slice(0, remainingSlots);

      for (const file of filesToAdd) {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.result) {
            this.images.push(reader.result as string);
          }
        };

        reader.readAsDataURL(file);
      }

      // Reset input to allow re-selecting same file
      input.value = '';

      if (this.images.length >= 4) {
        alert('Maximum 4 images allowed.');
      }
    }
  }
}

// Get the input element inside the div#pick-img
// const fileInput = document.querySelector('#pick-img #img');

// // Add change listener to detect when a file is selected
// fileInput.addEventListener('change', function (event) {
//   const file = event.target.files[0]; // Get the first selected file
//   if (file && file.type.startsWith('image/')) {
//     const imageUrl = URL.createObjectURL(file); // Create a temporary URL for preview
//     document.getElementById('preview').src = imageUrl;
//   } else {
//     alert('Please select a valid image file.');
//   }
// });

//  constructor(@In
// ject(DOCUMENT) private document: Document) { }

//       // Use the document object here
//       scrollToTop() {
//           this.document.documentElement.scrollTop = 0;
//       }
// @ViewChild('editor') editor!: QuillEditorComponent;

// content = '';
// name = 'Angular';
// modules = {
//   formula: true,
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ['bold', 'italic', 'underline'],
//     ['formula'],
//     ['image', 'code-block'],
//   ],
// };

// logChange($event: any) {
//   console.log(this.editor);
//   console.log($event);
// }
