import {SimpleCommentAuthorDTO} from './simpleCommentAuthorDTO.model';

export interface SimpleCommentDTO {
  id: string;
  content: string;
  author: SimpleCommentAuthorDTO;
}
