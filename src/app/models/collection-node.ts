export interface CollectionModel {
  collection: CollectionNode[];
}

export interface CollectionNode {
  id: string;
  name: string;
  type?: string;
  url: string;
  description: string;
}
