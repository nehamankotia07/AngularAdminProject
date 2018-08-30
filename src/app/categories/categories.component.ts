import { Component, OnInit } from '@angular/core';
import { RankingService } from '../ranking.service';
import { RankData } from '../rankdata'
import { Category } from '../_models/category'
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category: Category = new Category();

  public addCategory(form): void {
    console.log(this.category.name)
    if (form.invalid) {
      return;
    }
    this.nodeFound = false;
    this.findRankingByParentIdAndAdd(this.category.ParentCategoryId+100, this.category.ParentCategoryId, this.category.Name, this.rankingData);
    if(this.nodeFound) {
      this.statusMessage = "Category added successfully.";
    } else {
      this.statusMessage = "Category not found.";
    }
  }


  rankingData: any = [];
  sampleRankingData: any = [];
  nodeFound: boolean = false;
  nodeSelectList: any = [];

  dataName: string;
  parentId: number = -1;

  dataNameUpdate: string;
  nodeId: number = -1;

  dataNameSearch: string;
  dataSearchResult: any;

  nameString: string = "";

  statusMessage: string = "";

  constructor(private rankingService: RankingService,
              private categoryService: CategoryService,
              ) { }

  ngOnInit() {
    this.getRankingData();
  }

  public getRankingData(): void {
    this.rankingData = this.rankingService.getRankingData();
    this.populateSelectListOfNodes();
    this.sampleRankingData = this.rankingService.getRankingData();
  }

  public getNodes(rankingData: any) {
    for(let rd of rankingData) {
      this.nodeSelectList.push({id: rd.Id, name: rd.Name});
      if (rd.Nodes != null){
        this.getNodes(rd.Nodes);
      }
    }
  }

  public getAllChildNodeNames(rankingData: any) {
    this.nameString = "";
    if (rankingData != null) {
      for(let rd of rankingData) {
        this.nameString += " > " + rd.Name;
        if (rd.Nodes != null){
          this.nameString += this.getAllChildNodeNames(rd.Nodes);
        }
      }
    }
    return this.nameString;
  }

  public populateSelectListOfNodes(): void {
    this.nodeSelectList = [];
    this.getNodes(this.rankingData);
  }

  public findRankingByParentIdAndAdd(idOfNode: number, parentId: number, dataName: string, rankingD: any) {
    if (!this.nodeFound) {
      if (parentId == -1) {
        if (rankingD == null) {
          rankingD = [];
        }
        rankingD.push({
           Id: idOfNode, Name: dataName, Nodes: null
        })
        this.nodeFound = true;
        this.populateSelectListOfNodes();
      } else {
        for(let rd of rankingD) {
            if(rd.Id == parentId) {
              if (rd.Nodes == null) {
                rd.Nodes = [];
              }
              rd.Nodes.push({
                 Id: idOfNode, Name: dataName, Nodes: null
              })
              this.nodeFound = true;
              this.populateSelectListOfNodes();
              return;
            } else {
              if (rd.Nodes != null){
                this.findRankingByParentIdAndAdd(idOfNode, parentId, dataName, rd.Nodes);
              }
            }
        }
      }
    } else {
      return;
    }
  }

  public findRankingByParentIdAndUpdate(nodeId: number, dataName: string, rankingD: any) {
    if (!this.nodeFound) {
      for(let rd of rankingD) {
          if(rd.Id == nodeId) {
            rd.Name = dataName;
            this.nodeFound = true;
            this.populateSelectListOfNodes();
            return;
          } else {
            if (rd.Nodes != null){
              this.findRankingByParentIdAndUpdate(nodeId, dataName, rd.Nodes);
            }
          }
      }
    } else {
      return;
    }
  }

  public findRankingByName(dataName: string, rankingD: any) {
    if (!this.nodeFound) {
      for(let rd of rankingD) {
          if(rd.Name.toLowerCase() == dataName.toLowerCase()) {
            this.nodeFound = true;
            this.dataSearchResult = [rd];
          } else {
            if (rd.Nodes != null){
              this.findRankingByName(dataName, rd.Nodes);
            }
          }
      }
    }
  }

  public addDatainRankingData(): void {
    this.nodeFound = false;
    if(this.dataName == null || this.dataName == "") {
      this.statusMessage = "Node name is blank.";
      return;
    } else {
      this.findRankingByParentIdAndAdd(this.parentId+100, this.parentId, this.dataName, this.rankingData);
      if(this.nodeFound) {
        this.statusMessage = "Node added successfully.";
      } else {
        this.statusMessage = "Node not found.";
      }
    }
  }

  public updateDatainRankingData(): void {
    this.nodeFound = false;
    if(this.dataNameUpdate == null || this.dataNameUpdate == "") {
      this.statusMessage = "Node name is blank.";
      return;
    } else {
      this.findRankingByParentIdAndUpdate(this.nodeId, this.dataNameUpdate, this.rankingData);
      if(this.nodeFound) {
        this.statusMessage = "Node updated successfully.";
      } else {
        this.statusMessage = "Node not found.";
      }
    }
  }

  public searchDatainRankingData(): void {
    this.getRankingData();
    this.nodeFound = false;
    this.findRankingByName(this.dataNameSearch, this.rankingData);
    if(this.nodeFound) {
      this.rankingData = this.dataSearchResult;
      this.statusMessage = "Node found with name " + this.dataNameSearch + ": " + JSON.stringify(this.dataSearchResult);
    } else {
      if(this.dataNameSearch == "") {
        this.getRankingData();
        this.statusMessage = "";
      } else {
        this.rankingData = [];
        this.statusMessage = "Node not found with name: " + this.dataNameSearch;
      }

    }
  }

  public setUpdateFormData(nodeId: number, nodeName: string, item: any) {
    this.nodeId = nodeId;
    this.dataNameUpdate = nodeName;
    this.nodeSelectList = [];
    this.getNodes([item]);
  }

}
