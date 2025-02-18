// Third party import
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
// Local import
import { StoreItem } from './storeItem';
import { Category } from '../types/category.type';
import { CategoryService } from '../services/category.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesStoreItem extends StoreItem<Category[]> {
  constructor(private readonly categoryService: CategoryService) {
    super([]);
  }

  async loadCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.setValue(categories);
    });
  }

  get categories$(): Observable<Category[]> {
    return this.value$;
  }

  get topLevelCategories$(): Observable<Category[]> {
    return this.value$.pipe(
      map((categories) =>
        categories.filter((category) => category.parent_category_id === null)
      )
    );
  }
}
