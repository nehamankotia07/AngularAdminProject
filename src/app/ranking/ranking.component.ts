import { Component, OnInit } from '@angular/core';
import { RankingService } from '../ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  rankingData: any = [];

  constructor(private rankingService: RankingService) { }

  ngOnInit() {
    this.getRankingData();
  }

  getRankingData(): void {

    this.rankingData = this.rankingService.getRankingData();
    console.log(this.rankingData)
  }

}
