import { Component, OnInit } from '@angular/core';
import { RankingService } from '../ranking.service';
import { RankData } from '../rankdata'

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {


  rankingData: any = [];
  nodeFound: boolean = false;

  dataName: string;
  parentId: number;

  dataNameUpdate: string;
  nodeId: number;

  constructor(private rankingService: RankingService) { }

  ngOnInit() {
    this.getRankingData();
  }

  public getRankingData(): void {
    this.rankingData = this.rankingService.getRankingData();
  }

  public findRankingByParentIdAndAdd(idOfNode: number, parentId: number, dataName: string, rankingD: any) {
    if (!this.nodeFound) {
      for(let rd of rankingD) {
          if(rd.Id == parentId) {
            if (rd.Nodes == null) {
              rd.Nodes = [];
            }
            rd.Nodes.push({
               Id: idOfNode, Name: dataName, Nodes: null
            })
            this.nodeFound = true;
            return;
          } else {
            if (rd.Nodes != null){
              this.findRankingByParentIdAndAdd(idOfNode, parentId, dataName, rd.Nodes);
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

  public addDatainRankingData(): void {
    this.nodeFound = false;
    this.findRankingByParentIdAndAdd(this.parentId+100, this.parentId, this.dataName, this.rankingData);
  }

  public updateDatainRankingData(): void {
    this.nodeFound = false;
    this.findRankingByParentIdAndUpdate(this.nodeId, this.dataNameUpdate, this.rankingData);

  }
}
