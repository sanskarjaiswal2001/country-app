import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css'],
})
export class CountryTableComponent implements OnInit {
  public data: any[] = [];
  public pageSize = 20;
  public skip = 0;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadData();
  }
  public pageChange(event: any): void {
    this.skip = event.skip;
    this.loadData();
  }
  private loadData(): void {
    this.http.get<any[]>('https://restcountries.com/v3/all').subscribe(
      (data: any[]) => {
        //Country population sort in descending order
        this.data = data.sort((a, b) => b.population - a.population);
        //Country serial number
        this.data.forEach((country, index) => {
          country.index = index + 1;
        });
        //Country currency list
        this.data.forEach((country) => {
          const currencies = country.currencies;
          const currencyKeys = Object.keys(currencies);
          const currencyList = currencyKeys.map((key) => {
            if (currencies[key].symbol === null) {
              currencies[key].symbol = '';
            }
            return `${currencies[key].symbol} ${currencies[key].name}`;
          });
          country.currencyList = currencyList.join(', ');
        });
      },
      (error: any) => {
        console.error('Error fetching data: ${error}');
      }
    );
  }
}
