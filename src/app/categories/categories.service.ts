import { Injectable } from '@angular/core';
import {Category} from './model/category.model';

const dataSource = [
  {
    name: "Candles",
    description: "Various scented candles",
    status: "APPROVED"
  },
  {
    name: "Incense",
    description: "Aromatic incense sticks",
    status: "APPROVED"
  },
  {
    name: "Essential Oils",
    description: "Pure essential oils",
    status: "APPROVED"
  },
  {
    name: "Diffusers",
    description: "Aromatic diffusers",
    status: "APPROVED"
  },
  {
    name: "Bath Salts",
    description: "Relaxing bath salts",
    status: "APPROVED"
  },
  {
    name: "Face Masks",
    description: "Hydrating and cleansing masks",
    status: "PENDING"
  },
  {
    name: "Room Sprays",
    description: "Refreshing room sprays",
    status: "PENDING"
  },
  {
    name: "Massage Oils",
    description: "Therapeutic massage oils",
    status: "PENDING"
  }
];


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesList :Category[] = []

  constructor() {
    for (let data of dataSource) {
      const category: Category = {
        id: Math.random(),
        name: data.name,
        description: data.description,
        status: data.status
      }
      this.categoriesList.push(category);
    }
  }

  getApproved(): Category[] {
    return this.categoriesList.filter((c: Category) => c.status === "APPROVED");
  }

  getSuggestions(): Category[] {
    return this.categoriesList.filter((c: Category) => c.status === "PENDING");
  }

  add(category: Category): void {
    category.id = Math.random();
    category.status = "APPROVED";
    this.categoriesList.push(category);
  }

  remove(category: Category): void {
    this.categoriesList = this.categoriesList.filter((c: Category) => c.id !== category.id);
  }

  update(category: Category): void {
    const index: number = this.categoriesList.findIndex((c: Category) => c.id === category.id);
    this.categoriesList[index] = category;
  }

  approve(category: Category) {
    category.status = "APPROVED"
    this.update(category);
  }
}
