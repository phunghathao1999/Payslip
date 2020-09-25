import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/Models/pagination';
import { paginationList } from 'src/app/Models/paginationList';
import { Payslip } from 'src/app/Models/payslip';
import { PayslipService } from 'src/app/Service/payslip.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {

  payslips: paginationList<Payslip>;
  keySearch = '';
  pagination: Pagination = { searchValue: '', currentPage: 0, pageSize :10, sort: 'ASC', sortKey: 'month' } as Pagination;

  searchPayslip() {

  }
  getPagePayslips() {
    this.payslipService.getPagePayslips(this.pagination)
    .subscribe(paginationlist => this.payslips = paginationlist);
  }

  constructor(
    private payslipService: PayslipService,
  ) { }

  ngOnInit(): void {
    this.getPagePayslips();
  }

}
