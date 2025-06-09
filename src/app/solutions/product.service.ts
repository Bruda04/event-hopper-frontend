import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../env/envirements';
import {PagedResponse} from '../shared/model/paged-response.model';
import {ProductDTO} from '../shared/dto/solutions/productDTO.model';
import {SolutionDetailsDTO} from '../shared/dto/solutions/solutionDetailsDTO.model';
import {ServiceProviderDetailsDTO} from '../shared/dto/users/serviceProvider/serviceProviderDetailsDTO.model';
import {PriceManagementDTO} from '../shared/dto/prices/PriceManagementDTO.model';
import {UpdatePriceDTO} from '../shared/dto/prices/updatePriceDTO.model';
import {CreateProductRatingDTO} from '../shared/dto/ratings/CreateProductRatingDTO.model';
import {CreateCommentDTO} from '../shared/dto/comments/createCommentDTO.model';
import {ServiceManagementDTO} from '../shared/dto/solutions/serviceManagementDTO.model';
import {ProductForManagementDTO} from '../shared/dto/solutions/productForManagementDTO.model';
import {CreateServiceDTO} from '../shared/dto/solutions/createServiceDTO.model';
import {UpdateServiceDTO} from '../shared/dto/solutions/updateServiceDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private HttpClient: HttpClient) { }


  getAllForManagement(pageProperties: any,
                      categoryId: string,
                      eventTypeIds: string[],
                      minPrice: number,
                      maxPrice: number,
                      available: boolean,
                      textSearch: string,
                      sortField: string,
                      sortDirection: string
  ): Observable<PagedResponse<ProductForManagementDTO>> {
    let params :HttpParams = new HttpParams();
    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.pageSize)
    }

    if(categoryId) {
      params = params.set('categoryId', categoryId);
    }
    if(eventTypeIds) {
      params = params.set('eventTypeIds', eventTypeIds.join(','));
    }
    if(minPrice) {
      params = params.set('minPrice', minPrice);
    }
    if(maxPrice) {
      params = params.set('maxPrice', maxPrice);
    }
    if(available !== null) {
      params = params.set('isAvailable', available);
    }
    if (textSearch) {
      params = params.set('searchContent', textSearch);
    }
    if (sortField) {
      params = params.set('sortField', sortField);
    }
    if (sortDirection) {
      params = params.set('sortDirection', sortDirection);
    }


    return this.HttpClient.get<PagedResponse<ProductForManagementDTO>>(environment.apiHost + `/products/management`, {params: params});
  }

  add(product: CreateServiceDTO): Observable<any> {
    return this.HttpClient.post(environment.apiHost + '/products/', product);
  }

  remove(id: string): Observable<any> {
    return this.HttpClient.delete(environment.apiHost + '/products/' + id);
  }

  update(id: string, product: UpdateServiceDTO): Observable<any> {
    return this.HttpClient.put(environment.apiHost + '/products/' + id, product);
  }

  getSolutions(): Observable<ProductDTO[]>{
    return this.HttpClient.get<ProductDTO[]>(environment.apiHost + '/solutions');
  }

  getSolution(id: string): Observable<ProductDTO> {
    return this.HttpClient.get<ProductDTO>(environment.apiHost + '/solutions/' + id);
  }

  getSolutionDetails(id: string): Observable<SolutionDetailsDTO> {
    return this.HttpClient.get<SolutionDetailsDTO>(environment.apiHost + '/solutions/' + id + '/details');
  }

  getTop5Solutions(): Observable<ProductDTO[]> {
    return this.HttpClient.get<ProductDTO[]>(environment.apiHost + '/solutions/persons-top-5' );
  }

  getSolutionsPage(
    pageProperties: any,
    sortField: string,
    isProduct: boolean,
    isService: boolean,
    categoryId?: string,
    eventTypeIds?: string[],
    minPrice?: number,
    maxPrice?: number,
    available?: boolean,
    searchContent?: string,

  ): Observable<PagedResponse<ProductDTO>> {
    let params = new HttpParams()
    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.pageSize)
    }


    params = params.set('isProduct', isProduct);


    params = params.set('isService', isService);


    if(categoryId) {
      params = params.set('categoryId', categoryId);
    }
    if(eventTypeIds) {
      params = params.set('eventTypeIds', eventTypeIds.join(','));
    }
    if(minPrice) {
      params = params.set('minPrice', minPrice);
    }
    if(maxPrice) {
      params = params.set('maxPrice', maxPrice);
    }
    if(available !== null) {
      params = params.set('isAvailable', available);
    }
    if (searchContent) {
      params = params.set('searchContent', searchContent);
    }
    if (sortField) {
      params = params.set('sortField', sortField);
    }

    return this.HttpClient.get<PagedResponse<ProductDTO>>(environment.apiHost + '/solutions/search', { params });
  }

  getPricesForManagement(): Observable<PriceManagementDTO[]> {
    return this.HttpClient.get<PriceManagementDTO[]>(environment.apiHost + '/prices/management');
  }

  updatePrice(productId: string, price: UpdatePriceDTO): Observable<any> {
    return this.HttpClient.put(environment.apiHost + '/prices/'+ productId, price);
  }

  rateProduct(rating: CreateProductRatingDTO): Observable<any> {
    return this.HttpClient.post(environment.apiHost + '/ratings/solution', rating);
  }

  commentProduct(comment: CreateCommentDTO): Observable<any> {
    return this.HttpClient.post(environment.apiHost + '/comments', comment);
  }
}
