import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MockService } from '../app-mocks/mock.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MuseumNode } from '../models/museum-node';

export type CollectionType = 'all' | 'potery' | 'painting';

@Component({
  selector: 'app-tree-component',
  templateUrl: './tree-component.component.html',
  styleUrls: ['./tree-component.component.scss']
})

export class TreeComponentComponent implements OnInit {

  @Output() imageTitleAndDescription = new EventEmitter<object>();

  public activeNode: any;
  public treeControl = new NestedTreeControl<MuseumNode>(node => node.collection)
  public dataSource = new MatTreeNestedDataSource<MuseumNode>();
  public imageUrl: any;

  private collection: any;
  private collectionId: any;
  private selectedType: CollectionType = 'all';

  constructor(private mockService: MockService) {
    this.getAllData();
  }

  hasChild = (_: number, node: MuseumNode) => !!node.collection && node.collection.length > 0;

  ngOnInit(): void {
    this.collection = this.mockService.getCollection()[0].collection;
  }

  onLeafNodeClick(node: any) {
    this.activeNode = node;
    this.collectionId = this.mockService.getCollectionById(node.id);
    this.imageTitleAndDescription.emit(this.collectionId);
  }

  /**
   * fetch default state of the tree - all data
   *
   */
  getAllData() {
    this.selectedType = 'all';
    this.dataSource.data = this.mockService.getTreeCollection();
  }

  /**
   * fetch all potteries data
   *
   */
  getAllPotteries() {
    this.selectedType = 'potery';
    this.dataSource.data = this.filterRecursive('', 'potery', this.mockService.getTreeCollection());
  }

  /**
   * fetch all paintings
   *
   */
  getAllPaintings() {
    this.selectedType = 'painting';
    this.dataSource.data = this.filterRecursive('', 'painting', this.mockService.getTreeCollection());
  }

  /**
   * filters datasource array on dependency of search and type
   *
   * @param searchText text from search
   * @param type of CollectionType
   * @param array datasource to be filtered
   */
  filterRecursive(searchText: string, type: CollectionType = 'all', array: any[]) {
    let filteredData;

    function copy(objectToCopy: any) {
      return Object.assign({}, objectToCopy);
    }

    if (searchText) {
      const filterText = searchText.toLowerCase();

      filteredData = array.map(copy).filter(function check(node) {
        if (node.type === type && node.name.toLowerCase().includes(filterText)) {
          return true;
        }
        if (node.collection) {
          return (node.collection = node.collection.map(copy).filter(check)).length;
        }
      });
    } else {
      filteredData = array.map(copy).filter(function check(node) {
        if (node.type === type) {
          return true;
        }
        if (node.collection) {
          return (node.collection = node.collection.map(copy).filter(check)).length;
        }
      });
    }

    return filteredData;
  }

  /**
   * search collection over search term, depending on collection type
   *
   * @param searchTerm
   */
  filterTree(searchTerm: string) {
    this.dataSource.data = this.filterRecursive(searchTerm, this.getActiveType(), this.dataSource.data);
  }

  applyFilter(searchTermEvent: any) {
    const searchTerm = searchTermEvent?.value;

    this.filterTree(searchTerm);

    // if (searchTerm) {
    //   console.log(this.treeControl)
    //   this.treeControl.expandAll();
    // } else {
    //   this.treeControl.collapseAll();
    // }
  }

  private getActiveType() {
    return this.selectedType;
  }
}
