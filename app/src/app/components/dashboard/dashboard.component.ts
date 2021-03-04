import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // User dashboard variables
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartType = 'line';
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartOptions: ChartOptions = {
    responsive: true
  }


  lineChartColors: Color [] = [
    {
      borderColor: '#0d1b2a',
      backgroundColor: '#0d1b2a',
    },
  ];

  bookingLineChartData: ChartDataSets[];
  bookingLineChartLabels: Label[];

  dataArray: any = [];
  dataPoints: any = [];
  chartReady: boolean = false;
  bookingChartReady = false;

  bookingArray: any = [];
  bookingPoints: any = [];




  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getTotalNumberOfUsers();
    this.getTotalNumberOfBookings();
  }

  // get total number of users
  getTotalNumberOfUsers() {
      // get latest number of users
      this.userService.countUsers()
        .subscribe((response: any) => {
          this.dataArray = response.DATA;
          // load dashboard once all data has been received
          this.loadUserDashboard();
          this.getTotalNumberOfBookings();
        }, error => {
          console.log(error);
        });
  }

    // get total number of users
    getTotalNumberOfBookings() {
        // get latest number of users
        this.userService.getBookings()
          .subscribe((response: any) => {
            this.bookingArray = response.DATA;
            console.log(this.bookingArray)
            // load dashboard once all data has been received
            this.loadBookingsDashboard();
          }, error => {
            console.log(error);
          });
    }
  


  // load dashboard
  loadUserDashboard(): void {
    let labels = [];
    this.dataArray.forEach(x => {
      labels.push(x.name);
    });
    this.dataPoints = [];
    // format data points
    this.dataArray.forEach(x => {
      this.dataPoints.push(x.count);
    });//
    this.chartReady = true;
    this.lineChartData = [
      {
        data: this.dataPoints,
        label: 'Current number of users'
      }
    ];
    this.lineChartLabels = labels;
  }

  
  // load dashboard
  loadBookingsDashboard(): void {
    let labels = [];
    this.bookingArray.forEach(x => {
      labels.push(x.name);
    });
    this.bookingPoints = [];
    // format data points
    this.bookingArray.forEach(x => {
      this.bookingPoints.push(x.count);
    });
    this.bookingChartReady = true;
    this.bookingLineChartData = [
      {
        data: this.bookingPoints,
        label: 'Current number of bookings'
      }
    ];
    this.bookingLineChartLabels = labels;
  }
}
